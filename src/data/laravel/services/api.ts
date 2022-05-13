import { Mutex } from "async-mutex";
import { container } from "@src/appEngine";
import { QUERY_KEYS } from "@constants/query";
import LoginUser from "@core/domain/LoginUser";
import { ConfigService } from "@config/ConfigService";
import { loggedOut, tokenReceived } from "@store/actions/auth";
import { isErrorWithMessage, isValidationError } from "@utils/error-handling";
import {
  ISale,
  IFilm,
  IStaff,
  ICustomer,
  RootState,
  UserResponse,
  JoteyQueryError,
  PaginatedResponse,
  DjangoPaginatedResponse,
} from "@src/types";
import {
  createApi,
  FetchArgs,
  BaseQueryFn,
  fetchBaseQuery,
} from "@reduxjs/toolkit/query/react";

const configService = container.get<ConfigService>(ConfigService);

export function providesList<
  O extends { id: string | number },
  R extends PaginatedResponse<O> | Array<O> | undefined,
  T extends string
>(
  resultsWithIds: R | undefined,
  error: JoteyQueryError | undefined,
  tagType: T
) {
  if (error) {
    return [QUERY_KEYS.UNKNOWN_ERROR];
  }

  if (resultsWithIds) {
    const result = Array.isArray(resultsWithIds)
      ? resultsWithIds
      : resultsWithIds.data;
    return [
      { type: tagType, id: "LIST" } as const,
      ...result.map(({ id }) => ({ type: tagType, id } as const)),
    ];
  }

  return [{ type: tagType, id: "LIST" }] as const;
}

// create a new mutex
const mutex = new Mutex();
const baseQuery = fetchBaseQuery({
  baseUrl: configService.apiBaseURL,
  prepareHeaders: (headers, { getState }) => {
    headers.append("X-Requested-With", "XMLHttpRequest");
    // By default, if we have a token in the store, let's use that for authenticated requests
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const laravelBaseQuery: BaseQueryFn<
  string | FetchArgs,
  unknown,
  JoteyQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error) {
    const err = result.error;

    // you can access all properties of `FetchBaseQueryError` here
    let non_field_error =
      "error" in err
        ? err.error
        : isErrorWithMessage(err.data)
        ? !!err.data.message
          ? err.data.message
          : "Something went wrong"
        : typeof err.data === "string"
        ? (err.data as string)
        : "Server gave invalid error format";

    let field_errors: Record<string, string> = {};

    if (err.data && isValidationError(err.data)) {
      field_errors = Object.entries(err.data.errors).reduce(
        (acc, [fieldName, [errorMessage]]) => {
          acc[fieldName] = errorMessage;
          return acc;
        },
        {} as Record<string, string>
      );
    }

    return {
      error: {
        status: err.status,
        data: {
          field_errors,
          non_field_error,
        },
      },
      meta: result.meta,
    };
  }

  return {
    data: result.data,
    meta: result.meta,
  };
};

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  JoteyQueryError
> = async (args, api, extraOptions) => {
  // wait until the mutex is available without locking it
  await mutex.waitForUnlock();
  let result = await laravelBaseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    // checking whether the mutex is locked
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        const refreshResult = await laravelBaseQuery(
          {
            url: "/token",
            method: "POST",
            body: {
              email: "",
              password: "",
            },
          },
          api,
          extraOptions
        );
        if (refreshResult.data) {
          api.dispatch(tokenReceived(refreshResult.data as string));
          // retry the initial query
          result = await laravelBaseQuery(args, api, extraOptions);
        } else {
          api.dispatch(loggedOut());
        }
      } finally {
        // release must be called once the mutex should be released again.
        release();
      }
    } else {
      // wait until the mutex is available without locking it
      await mutex.waitForUnlock();
      result = await laravelBaseQuery(args, api, extraOptions);
    }
  }

  return result;
};

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    QUERY_KEYS.SALES,
    QUERY_KEYS.FILMS,
    QUERY_KEYS.STAVES,
    QUERY_KEYS.CUSTOMERS,
    QUERY_KEYS.ANALYTICS,
    QUERY_KEYS.UNKNOWN_ERROR,
  ],
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginUser>({
      query: (credentials) => ({
        url: "token",
        method: "POST",
        body: credentials,
      }),
    }),
    refetchErroredQueries: builder.mutation<null, void>({
      queryFn: () => ({ data: null }),
      invalidatesTags: [QUERY_KEYS.UNKNOWN_ERROR],
    }),
    getSaleList: builder.query<DjangoPaginatedResponse<ISale>, void>({
      query: () => ({
        url: "sales",
      }),
      providesTags: (result, error) => {
        if (error) {
          return [QUERY_KEYS.UNKNOWN_ERROR];
        }

        return result
          ? // successful query
            [
              ...result.results.map(
                ({ payment_id }) =>
                  ({ type: QUERY_KEYS.SALES, id: payment_id } as const)
              ),
              { type: QUERY_KEYS.SALES, id: "LIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type:QUERY_KEYS.PRODUCT_LIST, id: 'LIST' }` is invalidated
            [{ type: QUERY_KEYS.SALES, id: "LIST" }];
      },
    }),
    getStaffList: builder.query<DjangoPaginatedResponse<IStaff>, void>({
      query: () => ({
        url: "staves",
      }),
      providesTags: (result, error) => {
        if (error) {
          return [QUERY_KEYS.UNKNOWN_ERROR];
        }

        return result
          ? // successful query
            [
              ...result.results.map(
                ({ staff_id }) =>
                  ({ type: QUERY_KEYS.STAVES, id: staff_id } as const)
              ),
              { type: QUERY_KEYS.STAVES, id: "LIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type:QUERY_KEYS.PRODUCT_LIST, id: 'LIST' }` is invalidated
            [{ type: QUERY_KEYS.STAVES, id: "LIST" }];
      },
    }),
    getCustomerList: builder.query<DjangoPaginatedResponse<ICustomer>, void>({
      query: () => ({
        url: "customers",
      }),
      providesTags: (result, error) => {
        if (error) {
          return [QUERY_KEYS.UNKNOWN_ERROR];
        }

        return result
          ? // successful query
            [
              ...result.results.map(
                ({ customer_id }) =>
                  ({ type: QUERY_KEYS.CUSTOMERS, id: customer_id } as const)
              ),
              { type: QUERY_KEYS.CUSTOMERS, id: "LIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type:QUERY_KEYS.PRODUCT_LIST, id: 'LIST' }` is invalidated
            [{ type: QUERY_KEYS.CUSTOMERS, id: "LIST" }];
      },
    }),
    getFilmList: builder.query<DjangoPaginatedResponse<IFilm>, void>({
      query: () => ({
        url: "films",
      }),
      providesTags: (result, error) => {
        if (error) {
          return [QUERY_KEYS.UNKNOWN_ERROR];
        }

        return result
          ? // successful query
            [
              ...result.results.map(
                ({ film_id }) =>
                  ({ type: QUERY_KEYS.FILMS, id: film_id } as const)
              ),
              { type: QUERY_KEYS.FILMS, id: "LIST" },
            ]
          : // an error occurred, but we still want to refetch this query when `{ type:QUERY_KEYS.PRODUCT_LIST, id: 'LIST' }` is invalidated
            [{ type: QUERY_KEYS.FILMS, id: "LIST" }];
      },
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useLoginMutation,
  useGetSaleListQuery,
  useGetFilmListQuery,
  useGetStaffListQuery,
  useGetCustomerListQuery,
} = api;
