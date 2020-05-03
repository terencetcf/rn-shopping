import { IProductState } from './products';
import { ICardState } from './cart';
import { IOrdersState } from './orders';

export interface IRootState {
  products: IProductState;
  cart: ICardState;
  orders: IOrdersState;
}
