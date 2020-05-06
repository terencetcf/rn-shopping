import { ICartItem } from './cart-Item';

export class Order {
  id: string;
  items: ICartItem[];
  date: Date;
  totalAmount: number;

  constructor(items: ICartItem[], totalAmount: number, id?: string);
  constructor(items: ICartItem[], totalAmount: number, id: string) {
    this.id = id;
    this.items = items;
    this.totalAmount = totalAmount;
    this.date = new Date();
  }
}
