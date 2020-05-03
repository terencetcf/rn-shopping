export interface ICartItem {
  productId: string;
  productTitle: string;
  productPrice: number;
  quantity: number;
}

export class CartItem implements ICartItem {
  productId: string;
  productTitle: string;
  productPrice: number;
  quantity: number;

  constructor(
    productId: string,
    productTitle: string,
    price: number,
    quantity: number
  ) {
    this.productId = productId;
    this.productTitle = productTitle;
    this.productPrice = price;
    this.quantity = quantity;
  }
}
