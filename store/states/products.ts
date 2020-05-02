import Product from '../../models/product';

export interface IProductState {
  availableProducts: Product[];
  userProducts: Product[];
}
