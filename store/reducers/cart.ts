import { ICardState } from '../states/cart';
import { CartActionTypes, CartActions } from '../actions/cart';
import { CartItem } from '../../models/cart-Item';
import { OrdersActions, OrdersActionTypes } from '../actions/orders';

const initialState: ICardState = {
  items: [],
  totalAmount: 0,
};

export default (
  state: ICardState = initialState,
  action: CartActionTypes | OrdersActionTypes
) => {
  switch (action.type) {
    case CartActions.ADD_TO_CART:
      let productToAdd = action.product;
      let items: CartItem[] = [];
      const found = state.items.find(
        (item) => item.productId === productToAdd.id
      );
      if (found) {
        items = state.items.map((item) =>
          item.productId === productToAdd.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        items = [
          ...state.items,
          new CartItem(
            productToAdd.id,
            productToAdd.title,
            productToAdd.price,
            1
          ),
        ];
      }

      return { ...state, items, totalAmount: getTotal(items) };

    case CartActions.REMOVE_FROM_CART:
      const updatedItems = state.items.filter(
        (item) => item.productId !== action.productId
      );

      return {
        ...state,
        items: updatedItems,
        totalAmount: getTotal(updatedItems),
      };

    case CartActions.INCREASE_CART_ITEM_QUANTITY:
      const newIncreasedItems = state.items.map((item) =>
        item.productId === action.productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );

      return {
        ...state,
        items: newIncreasedItems,
        totalAmount: getTotal(newIncreasedItems),
      };

    case CartActions.DECREASE_CART_ITEM_QUANTITY:
      const newDecreasedItems = state.items
        .map((item) => {
          if (item.productId === action.productId) {
            if (item.quantity === 1) {
              return null;
            }

            return { ...item, quantity: item.quantity - 1 };
          }

          return item;
        })
        .filter((item) => item !== null) as CartItem[];

      return {
        ...state,
        items: newDecreasedItems,
        totalAmount: getTotal(newDecreasedItems),
      };

    case OrdersActions.ADD_ORDER:
      return initialState;

    default:
      return state;
  }
};

const getTotal = (items: CartItem[]) => {
  if (items.length < 1) {
    return 0;
  }

  return items
    .map((item) => item.productPrice * item.quantity)
    .reduce((prev, next) => prev + next);
};
