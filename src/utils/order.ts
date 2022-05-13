import { IOrder } from "@src/types";

export const getCustomerNameFromOrder = (order: IOrder) =>
  order.shipping_address.customer_name ?? order.customer?.name;

export const getCustomerContactFromOrder = (order: IOrder) =>
  order.shipping_address.customer_contact ?? order.customer_contact;
