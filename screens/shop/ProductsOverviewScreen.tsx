import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import {
  NavigationStackProp,
  NavigationStackScreenComponent,
} from 'react-navigation-stack';

import { IRootState } from '../../store/states';
import Product from '../../models/product';
import ProductItem from '../../components/shop/ProductItem';

type Params = { userId: string };

type ScreenProps = { language: string };

const ProductsOverviewScreen: NavigationStackScreenComponent<
  Params,
  ScreenProps
> = (props) => {
  const products = useSelector<IRootState, Product[]>(
    (state) => state.products.availableProducts
  );

  return (
    <FlatList<Product>
      data={products}
      renderItem={(itemData) => (
        <ProductItem
          product={itemData.item}
          onPressViewDetails={() => {
            props.navigation.navigate({
              routeName: 'ProductDetails',
              params: {
                productId: itemData.item.id,
                productTitle: itemData.item.title,
              },
            });
          }}
          onPressAddToCard={() => {}}
        />
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = {
  headerTitle: 'All Products',
};

export default ProductsOverviewScreen;

const styles = StyleSheet.create({});
