import { store } from "@store/configureStore";
import { ProductStatus } from "@constants/product";
import rootReducer from "@store/reducers/rootReducer";
import { DeliveryCompany } from "@constants/delivery";

export type LoginMutationResponseType = {};

export interface IOrderStatus {
  id: number;
  name: string;
  serial: number;
  color: string;
  created_at: Date;
  updated_at: Date;
}

export declare type IUserProfile = {
  id: number;
  bio?: string;
  contact?: string;
  avatar?: IAttachment;
  // customer?: Maybe<User>;
  // socials?: Maybe<Array<Maybe<Social>>>;
};

export declare type IUser = {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
  is_active: boolean;
  address: Array<{
    id: number;
    type: string;
    title: string;
    address: IUserAddress;
  }>;
  profile?: Maybe<IUserProfile>;
  // orders?: Maybe<OrderPaginator>;
};

export interface ICustomer {
  id: number;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  is_active: number;
  email_verified_at?: Date;
}

export declare type IUserAddress = {
  customer_email: string;
  customer_name: string;
  street_address: string;
  customer_contact: string;
  country: string;
  city: string;
  state: string;
  zip: string;
};

export interface IOrder {
  id: number;
  tracking_number: string;
  customer_id: number;
  customer_contact: string;
  status: IOrderStatus;
  amount: number;
  sales_tax: number;
  paid_total: number;
  total: number;
  coupon_id?: number;
  discount: number;
  payment_id?: number;
  shipping_address: IUserAddress;
  billing_address?: IUserAddress;
  logistics_provider?: string;
  delivery_fee: number;
  delivery_time: string;
  expense: number;
  instruction?: string;
  deleted_at?: Date;
  created_at: Date;
  updated_at: Date;
  customer?: ICustomer;
  products: IProduct[];
  payment_gateway: "cod" | "ssl" | "cash" | "online";
  delivery?: {
    order_id: number;
    name: DeliveryCompany;
  };
}

export interface IAttachment {
  thumbnail: string;
  original: string;
  id: number;
}

export interface IType {
  id: number;
  name: string;
  slug: string;
  icon?: any;
  image?: any;
  created_at: Date;
  updated_at: Date;
}

export interface ICategory {
  id: number;
  type: IType;
  name: string;
  slug: string;
  image: IAttachment[];
  icon?: string;
  details?: string;
  parent?: number;
  type_id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at?: any;
  children: ICategory[];
}

export interface IProduct {
  id: number;
  sku: string;
  name: string;
  type: IType;
  slug: string;
  unit: string;
  price: number;
  width?: string;
  height?: string;
  type_id: number;
  length?: string;
  quantity: number;
  created_at: Date;
  updated_at: Date;
  deleted_at?: Date;
  in_stock: boolean;
  image: IAttachment;
  is_taxable: boolean;
  description: string;
  sale_price?: number;
  variations: string[];
  status: ProductStatus;
  campaign_price: number;
  gallery: IAttachment[];
  pivot?: IOrderedProduct;
  categories: ICategory[];
  shipping_class_id?: string;
  variants: { [k: string]: { quantity: number } };
}

export interface ICatalog {
  name: string;
  slug: string;
  image: string;
  created_at: Date;
  enabled: boolean;
  products_count: number;
}

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export type ServerNonFieldError = {
  code: number;
  message: string;
};

export type PaginatedResponse<T> = {
  data: T[];
  to: number;
  from: number;
  total: number;
  per_page: number;
  last_page: number;
  current_page: number;
};

export type ResourceCreatedResponse = {
  code: 201;
  message: string;
};

export type ResourceUpdatedResponse = {
  code: 200;
  message: string;
};

export type ResourceDeletedResponse = {
  code: 200;
  message: string;
};

export type ServerValidationError = {
  code: number;
  message: string;
  errors: Record<string, string[]>;
};

export type ServerErrorType = ServerValidationError | ServerNonFieldError;

type FilterOperators = "like" | "=" | "between";

// UnionToIntersection<A | B> = A & B
type UnionToIntersection<U> = (
  U extends unknown ? (arg: U) => 0 : never
) extends (arg: infer I) => 0
  ? I
  : never;

// LastInUnion<A | B> = B
type LastInUnion<U> = UnionToIntersection<
  U extends unknown ? (x: U) => 0 : never
> extends (x: infer L) => 0
  ? L
  : never;

// UnionToTuple<A, B> = [A, B]
type UnionToTuple<T, Last = LastInUnion<T>> = [T] extends [never]
  ? []
  : [Last, ...UnionToTuple<Exclude<T, Last>>];

type SearchFields<
  T extends {},
  K extends UnionToTuple<keyof T> = UnionToTuple<keyof T>,
  R extends `${keyof T}:${FilterOperators}`[] = [`${K[0]}:${FilterOperators}`]
> = K extends [infer Head, ...infer Tail]
  ? SearchFields<T, Tail, [`${Head}:${FilterOperators}`, ...R]>
  : R;

// your answers
type Join<T extends unknown[], U extends string | number> = T extends [
  infer First,
  ...infer Rest
]
  ? `${First & string}${Rest["length"] extends 0 ? "" : U}${Join<Rest, U>}`
  : "";

export type PaginationQueryParams<T extends {}> = {
  page?: number;
  limit?: number;
  search?: string;
  orderBy?: keyof T;
  sortedBy?: "asc" | "desc";
};

export interface User {}

export interface UserResponse {
  user: User;
  token: string;
}

export type JoteyQueryError = {
  status: number | "FETCH_ERROR" | "PARSING_ERROR" | "CUSTOM_ERROR";
  data: {
    non_field_error: string;
    field_errors: Record<string, string>;
  };
};

export interface IOrderedProduct {
  variant: string;
  subtotal: number;
  unit_price: number;
  order_quantity: number;
  product_id: number | string;
}

export interface ICreateOrderRequest {
  status: number;
  total: number;
  amount: number;
  expense: number;
  discount?: number;
  paid_total: number;
  coupon_id?: number;
  sales_tax?: number;
  payment_id?: number;
  instruction: string;
  delivery_time: string;
  delivery_fee?: number;
  card?: Maybe<CardInput>;
  customer_contact: string;
  products: Array<IOrderedProduct>;
  billing_address?: Maybe<UserAddressInput>;
  shipping_address?: Maybe<UserAddressInput>;
  payment_gateway: "cod" | "ssl" | "cash" | "online";
}

export interface IUpdateOrderRequest extends ICreateOrderRequest {
  id: number;
  tracking_number: string;
}

export interface IAssignDeliveryResponse {
  id: number;
  order_id: number;
  updated_at: string;
  created_at: string;
  tracking_id: string;
  name: DeliveryCompany;
  extra: Array<{
    recipient_city: number;
    recipient_zone: number;
    recipient_area: number;
    item_quantity: number;
    item_weight: number;
    item_description: string;
    special_instruction: string;
    store_id: number;
  }>;
  api_response: Array<{
    consignment_id: string;
    merchant_order_id: null | string;
    order_status: string;
    delivery_fee: number;
  }>;
}

type ProgressablePreviewableFile = File & {
  preview: string;
  uploadProgress: number;
};

export declare type ICreateProductRequest = {
  name: string;
  unit: string;
  sku?: string;
  price: number;
  type_id: number;
  quantity: number;
  in_stock?: boolean;
  sale_price: number;
  description?: string;
  is_taxable?: boolean;
  height?: string;
  length?: string;
  width?: string;
  image?: IAttachment;
  status?: ProductStatus;
  categories?: number[];
  gallery?: IAttachment[];
};

export interface IUpdateProductRequest extends Partial<ICreateProductRequest> {
  id: number;
  variants?: { [k: string]: { quantity: number } } | null;
}

export declare type IAnalytics = {
  total_films: number;
  total_sales: number;
  total_staves: number;
  total_customers: number;
};

export type ICreateOrderStatusRequest = Omit<
  IOrderStatus,
  "id" | "created_at" | "updated_at"
>;

export type IUpdateOrderStatusRequest = Partial<
  Omit<IOrderStatus, "created_at" | "updated_at">
>;

export declare type IOutlet = {
  id: number;
  title: string;
  address: string;
  contacts: Array<string>;
  timetable: Record<
    | "friday"
    | "saturday"
    | "sunday"
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday",
    false | { open: string; close: string }
  >;
  today: Outlet["open"] extends false
    ? false
    : {
        open: string;
        close: string;
      };
  open: boolean;
  closed_on: (
    | "Saturday"
    | "Sunday"
    | "Monday"
    | "Tuesday"
    | "Wednesday"
    | "Thursday"
    | "Friday"
  )[];
};

export type ICreateOutletRequest = Pick<
  IOutlet,
  "title" | "address" | "contacts" | "timetable"
>;

export declare type ISettings = {
  id: number;
  options: {
    site_title?: string;
    logo?: IAttachment;
    site_subtitle?: string;
  };
};

export type ICreateSettingsRequest = Omit<ISettings, "id">;

export declare type IPost = {
  id: number;
  title: string;
  slug: string;
  body: string;
  type: "blog" | "question";
  created_at: string;
  updated_at: string;
};

export declare type ICampaign = {
  id: number;
  name: string;
  image: string;
  from: string;
  to: string;
  slug: string;
  active: boolean;
  products_count: number;
  created_at: string;
};

export type ICreateCampaignRequest = {
  name: string;
  image: File;
  from: string;
  to: string;
};

export type IUpdateCampaignRequest = Partial<
  Pick<"name" | "from" | "to" | "slug">
> & {
  image: File | string;
};

export interface ICoupon {
  id: number;
  code: string;
  amount: number;
  min_order: number;
  is_valid: boolean;
  expire_at: string;
  created_at: string;
  updated_at: string;
  description: string;
  active_from: string;
  max_discount: number;
  user_id: number | null;
  product_id: number | null;
  catalog_id: number | null;
  min_product_count: number;
  type: "fixed" | "percentage" | "free_shipping";
}

export type ICreateCouponRequest = Omit<
  ICoupon,
  "id" | "created_at" | "updated_at" | "catalog_id" | "user_id" | "is_valid"
>;

export type IUpdateCouponRequest = Partial<ICoupon>;

export interface ISale {
  payment_id: number;
  customer_name: string;
  customer_email: string;
  staff_name: string;
  staff_email: string;
  rental: {
    rental_date: string;
    return_date: string;
  };
  amount: string;
  payment_date: string;
  updated_at: string;
  created_at: string;
}

export enum FilmRating {
  G = "G",
  R = "R",
  PG = "PG",
  PG_13 = "PG-13",
  NC_17 = "NC-17",
}

export enum SpecialFeatures {
  TRAILERS = "TR",
  COMMENTARIES = "CM",
  DELETED_SCENES = "DS",
  BEHIND_THE_SCENES = "BS",
}

export interface IFilm {
  title: string;
  length: number;
  film_id: number;
  language: string;
  actors: string[];
  rating: FilmRating;
  updated_at: string;
  created_at: string;
  description: string;
  rental_rate: string;
  categories: string[];
  release_year: number;
  release_duration: number;
  replacement_cost: string;
  special_features: SpecialFeatures;
}

export interface IAddress {
  city: string;
  phone: string;
  country: string;
  address: string;
  district: string;
  address2: string;
  address_id: number;
  updated_at: string;
  created_at: string;
  postal_code: string;
}

export interface IStaff {
  email: number;
  store: string;
  active: boolean;
  username: string;
  staff_id: number;
  last_name: string;
  address: IAddress;
  first_name: string;
  updated_at: string;
  created_at: string;
}

export interface ICustomer extends Omit<IStaff, "staff_id" | "username"> {
  customer_id: number;
  total_purchase_amount: number;
  total_purchase_count: number;
}

export type DjangoPaginatedResponse<T> = {
  results: T[];
  count: number;
  next: null | string;
  prev: null | string;
};
