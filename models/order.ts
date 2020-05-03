import { ICartItem } from './cart-Item';

export class Order {
  id: string;
  items: ICartItem[];
  date: Date;
  totalAmount: number;

  constructor(
    items: ICartItem[],
    totalAmount: number,
    id?: string,
    date?: Date
  );
  constructor(items: ICartItem[], totalAmount: number, id: string, date: Date) {
    this.id = id;
    this.items = items;
    this.date = date;
    this.totalAmount = totalAmount;
  }
}
