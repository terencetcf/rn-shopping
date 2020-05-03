import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { NavigationDrawerScreenComponent } from 'react-navigation-drawer';

import { IRootState } from '../../store/states';
import Product from '../../models/product';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../UI/HeaderButton';
import device from '../../helpers/device';

type Params = {};

type ScreenProps = {};

const ProductsOverviewScreen: NavigationStackScreenComponent<
  Params,
  ScreenProps
> = (props) => {
  const products = useSelector<IRootState, Product[]>(
    (state) => state.products.availableProducts
  );

  const dispatch = useDispatch();

  const addToCard = (product: Product) => {
    dispatch(cartActions.addToCart(product));
  };

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
          onPressAddToCard={() => addToCard(itemData.item)}
        />
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'All Products',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Menu"
          iconName={device.isAndroid() ? 'md-menu' : 'ios-menu'}
          onPress={() => {
            (navData.navigation as any).toggleDrawer();
          }}
        />
      </HeaderButtons>
    ),
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Cart"
          iconName={device.isAndroid() ? 'md-cart' : 'ios-cart'}
          onPress={() => {
            navData.navigation.navigate('Cart');
          }}
        />
      </HeaderButtons>
    ),
  };
};

export default ProductsOverviewScreen;

const styles = StyleSheet.create({});
