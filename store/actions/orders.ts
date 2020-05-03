import { Order } from '../../models/order';

export enum OrdersActions {
  ADD_ORDER = 'ADD_ORDER',
}

interface addOrder {
  type: typeof OrdersActions.ADD_ORDER;
  orderData: Order;
}

export type OrdersActionTypes = addOrder;

export const addOrder = (orderData: Order) => {
  return { type: OrdersActions.ADD_ORDER, orderData };
};
