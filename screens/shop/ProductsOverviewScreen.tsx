import React from 'react';
import { StyleSheet, FlatList, Button } from 'react-native';
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
import DefaultHeaderLeft from '../../components/default/DefaultHeaderLeft';
import Colors from '../../constants/Colors';

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

  const productPressHandler = (product: Product) => {
    props.navigation.navigate({
      routeName: 'ProductDetails',
      params: {
        productId: product.id,
        productTitle: product.title,
      },
    });
  };

  const addToCard = (product: Product) => {
    dispatch(cartActions.addToCart(product));
  };

  return (
    <FlatList<Product>
      data={products}
      renderItem={(itemData) => (
        <ProductItem
          product={itemData.item}
          onPress={() => {
            productPressHandler(itemData.item);
          }}
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => productPressHandler(itemData.item)}
          />
          <Button
            color={Colors.primary}
            title="To Card"
            onPress={() => addToCard(itemData.item)}
          />
        </ProductItem>
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'All Products',
    headerLeft: () => <DefaultHeaderLeft navData={navData} />,
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
