import { CartItem } from '../../models/cart-Item';

export interface ICardState {
  items: CartItem[];
  totalAmount: number;
}
