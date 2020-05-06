import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

import Product from '../../models/product';
import apiHelper from '../../helpers/api-helper';

export enum ProductsActions {
  DELETE_PRODUCT = 'DELETE_PRODUCT',
  ADD_PRODUCT = 'ADD_PRODUCT',
  EDIT_PRODUCT = 'EDIT_PRODUCT',
  SET_PRODUCTS = 'SET_PRODUCTS',
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

interface setProductsAction {
  type: typeof ProductsActions.SET_PRODUCTS;
  products: Product[];
}

export type ProductsActionTypes =
  | deleteProductAction
  | addProductAction
  | editProductAction
  | setProductsAction;

export const deleteProduct = (productId: string) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    await apiHelper.delete(`products/${productId}`);

    return dispatch({ type: ProductsActions.DELETE_PRODUCT, productId });
  };
};

export const addProduct = (product: Product) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const data = await apiHelper.post('products', {
      ...product,
      id: undefined,
    });

    return dispatch({
      type: ProductsActions.ADD_PRODUCT,
      product: { ...product, id: data.name },
    });
  };
};

export const editProduct = (product: Product) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const _ = await apiHelper.patch(`products/${product.id}`, {
      title: product.title,
      imageUrl: product.imageUrl,
      price: product.price,
      description: product.description,
    });

    return dispatch({
      type: ProductsActions.EDIT_PRODUCT,
      product,
    });
  };
};

export const fetchProducts = () => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const data = await apiHelper.get('products');

    const products: Product[] = [];
    for (const key in data) {
      const product: Product = { ...data[key], id: key, ownerId: 'u1' };
      products.push(product);
    }

    return dispatch({
      type: ProductsActions.SET_PRODUCTS,
      products,
    });
  };
};
