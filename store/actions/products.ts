export enum ProductsActions {
  DELETE_PRODUCT = 'DELETE_PRODUCT',
}

interface deleteProductAction {
  type: typeof ProductsActions.DELETE_PRODUCT;
  productId: string;
}

export type ProductsActionTypes = deleteProductAction;

export const deleteProduct = (productId: string) => {
  return { type: ProductsActions.DELETE_PRODUCT, productId };
};
