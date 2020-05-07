import { IProductState } from './products';
import { ICardState } from './cart';
import { IOrdersState } from './orders';
import { IAuthState } from './auth';

export interface IRootState {
  products: IProductState;
  cart: ICardState;
  orders: IOrdersState;
  auth: IAuthState;
}
