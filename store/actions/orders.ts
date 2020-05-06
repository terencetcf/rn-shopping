import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { Order } from '../../models/order';
import apiHelper from '../../helpers/api-helper';
import orders from '../reducers/orders';

export enum OrdersActions {
  ADD_ORDER = 'ADD_ORDER',
  GET_ORDERS = 'GET_ORDERS',
}

interface addOrder {
  type: typeof OrdersActions.ADD_ORDER;
  orderData: Order;
}

interface getOrders {
  type: typeof OrdersActions.GET_ORDERS;
  orders: Order[];
}

export type OrdersActionTypes = addOrder | getOrders;

export const addOrder = (ownerId: string, orderData: Order) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const data = await apiHelper.post(`orders/${ownerId}`, {
      ...orderData,
    });

    return dispatch({
      type: OrdersActions.ADD_ORDER,
      orderData: { ...orderData, id: data.name },
    });
  };
};

export const getOrders = (ownerId: string) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const data = await apiHelper.get(`orders/${ownerId}`);

    const orders: Order[] = [];
    for (const key in data) {
      const order: Order = { ...data[key], id: key };
      orders.push(order);
    }

    return dispatch({
      type: OrdersActions.GET_ORDERS,
      orders,
    });
  };
};
