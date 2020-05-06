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
      return { ...state, orders: state.orders.concat(action.orderData) };

    case OrdersActions.GET_ORDERS:
      return { ...state, orders: action.orders };

    default:
      return state;
  }
};
