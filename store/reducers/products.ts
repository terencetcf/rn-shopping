import { ProductsActionTypes, ProductsActions } from '../actions/products';
import { IProductState } from '../states/products';
import PRODUCTS from '../../data/dummy-data';

const initialState: IProductState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((product) => product.ownerId === 'u1'),
};

export default (
  state: IProductState = initialState,
  action: ProductsActionTypes
) => {
  switch (action.type) {
    case ProductsActions.DELETE_PRODUCT:
      return {
        ...state,
        availableProducts: state.availableProducts.filter(
          (product) => product.id !== action.productId
        ),
        userProducts: state.userProducts.filter(
          (product) => product.id !== action.productId
        ),
      };

    case ProductsActions.ADD_PRODUCT:
      const newProduct = {
        ...action.product,
        id: new Date().getTime().toString(),
        ownerId: 'u1',
      };
      return {
        ...state,
        availableProducts: [...state.availableProducts, newProduct],
        userProducts: [...state.userProducts, newProduct],
      };

    case ProductsActions.EDIT_PRODUCT:
      return {
        ...state,
        availableProducts: [
          ...state.availableProducts.filter(
            (product) => product.id !== action.product.id
          ),
          action.product,
        ],
        userProducts: [
          ...state.userProducts.filter(
            (product) => product.id !== action.product.id
          ),
          action.product,
        ],
      };

    default:
      return state;
  }
};
