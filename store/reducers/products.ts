import { ProductActionTypes } from '../actions/products';
import { IProductState } from '../states/products';
import PRODUCTS from '../../data/dummy-data';

const initialState: IProductState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((product) => product.ownerId === 'u1'),
};

export default (
  state: IProductState = initialState,
  action: ProductActionTypes
) => {
  return state;
};
