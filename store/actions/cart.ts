import Product from '../../models/product';

export enum CartActions {
  ADD_TO_CART = 'ADD_TO_CART',
  REMOVE_FROM_CART = 'REMOVE_FROM_CART',
  INCREASE_CART_ITEM_QUANTITY = 'INCREASE_CART_ITEM_QUANTITY',
  DECREASE_CART_ITEM_QUANTITY = 'DECREASE_CART_ITEM_QUANTITY',
}

interface addToCartAction {
  type: typeof CartActions.ADD_TO_CART;
  product: Product;
}

interface removeFromCartAction {
  type: typeof CartActions.REMOVE_FROM_CART;
  productId: string;
}

interface increaseCartItemQuantityAction {
  type: typeof CartActions.INCREASE_CART_ITEM_QUANTITY;
  productId: string;
}

interface decreaseCartItemQuantityAction {
  type: typeof CartActions.DECREASE_CART_ITEM_QUANTITY;
  productId: string;
}

export type CartActionTypes =
  | addToCartAction
  | removeFromCartAction
  | increaseCartItemQuantityAction
  | decreaseCartItemQuantityAction;

export const addToCart = (product: Product) => {
  return { type: CartActions.ADD_TO_CART, product: product };
};

export const removeFromCard = (productId: string) => {
  return { type: CartActions.REMOVE_FROM_CART, productId };
};

export const increaseCartQuantity = (productId: string) => {
  return { type: CartActions.INCREASE_CART_ITEM_QUANTITY, productId };
};

export const decreaseCartQuantity = (productId: string) => {
  return { type: CartActions.DECREASE_CART_ITEM_QUANTITY, productId };
};
