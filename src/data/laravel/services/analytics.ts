import { api } from "./api";
import { IAnalytics } from "@src/types";
import { QUERY_KEYS } from "@constants/query";

// Define a service using a base URL and expected endpoints
export const analyticsApi = api.injectEndpoints({
  overrideExisting: false,
  endpoints: (builder) => ({
    getAnalytics: builder.query<IAnalytics, void>({
      query: () => ({
        url: `analytics`,
      }),
      providesTags: (result) => [{ type: QUERY_KEYS.ANALYTICS, id: "LIST" }],
    }),
  }),
});

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAnalyticsQuery } = analyticsApi;
