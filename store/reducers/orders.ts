import { IOrdersState } from '../states/orders';
import { OrdersActionTypes, OrdersActions } from '../actions/orders';

const initialState: IOrdersState = {
  orders: [],
};

export default (
  state: IOrdersState = initialState,
  action: OrdersActionTypes
) => {
  switch (action.type) {
    case OrdersActions.ADD_ORDER:
      const now = new Date();
      const newOrder = {
        ...action.orderData,
        id: now.getTime().toString(),
        date: now,
      };
      return { ...state, orders: state.orders.concat(newOrder) };

    default:
      return state;
  }
};
