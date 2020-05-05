import Product from '../../models/product';

export enum ProductsActions {
  DELETE_PRODUCT = 'DELETE_PRODUCT',
  ADD_PRODUCT = 'ADD_PRODUCT',
  EDIT_PRODUCT = 'EDIT_PRODUCT',
}

interface deleteProductAction {
  type: typeof ProductsActions.DELETE_PRODUCT;
  productId: string;
}

interface addProductAction {
  type: typeof ProductsActions.ADD_PRODUCT;
  product: Product;
}
interface editProductAction {
  type: typeof ProductsActions.EDIT_PRODUCT;
  product: Product;
}

export type ProductsActionTypes =
  | deleteProductAction
  | addProductAction
  | editProductAction;

export const deleteProduct = (productId: string) => {
  return { type: ProductsActions.DELETE_PRODUCT, productId };
};

export const addProduct = (product: Product) => {
  return { type: ProductsActions.ADD_PRODUCT, product };
};

export const editProduct = (product: Product) => {
  return { type: ProductsActions.EDIT_PRODUCT, product };
};
