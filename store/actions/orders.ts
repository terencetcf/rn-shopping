import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import { Order } from '../../models/order';
import apiHelper from '../../helpers/api-helper';
import orders from '../reducers/orders';
import { IRootState } from '../states';

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

export const addOrder = (orderData: Order) => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    getState: () => IRootState
  ) => {
    const state = getState();
    const data = await apiHelper.post(
      `orders/${state.auth.userId}`,
      {
        ...orderData,
      },
      state.auth.token
    );

    return dispatch({
      type: OrdersActions.ADD_ORDER,
      orderData: { ...orderData, id: data.name },
    });
  };
};

export const getOrders = () => {
  return async (
    dispatch: ThunkDispatch<{}, {}, AnyAction>,
    getState: () => IRootState
  ) => {
    const state = getState();
    const data = await apiHelper.get(`orders/${state.auth.userId}`);

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
