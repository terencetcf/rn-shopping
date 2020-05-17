import React, { useEffect, useState, useCallback } from 'react';
import { StyleSheet, FlatList, Button, View, Text } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { StackScreenProps } from '@react-navigation/stack';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { IRootState } from '../../store/states';
import Product from '../../models/product';
import ProductItem from '../../components/shop/ProductItem';
import * as cartActions from '../../store/actions/cart';
import * as productActions from '../../store/actions/products';
import CustomHeaderButton from '../../UI/HeaderButton';
import device from '../../helpers/device';
import DefaultHeaderLeft from '../../components/default/DefaultHeaderLeft';
import Colors from '../../constants/Colors';
import ErrorView from '../../components/ErrorView';
import Loader from '../../components/Loader';
import CenteredView from '../../components/CenteredView';
import { RootStackNavigatorParamList } from '../../navigation/ShopNavigator';

interface IProps extends StackScreenProps<RootStackNavigatorParamList> {}

const ProductsOverviewScreen: React.FC<IProps> = ({ navigation, ...props }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string>('');
  const products = useSelector<IRootState, Product[]>(
    (state) => state.products.availableProducts
  );
  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    setError('');
    setIsRefreshing(true);
    try {
      await dispatch(productActions.fetchProducts());
    } catch (err) {
      setError(err.message);
    }

    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener('focus', loadProducts);

    return () => {
      unsubscribeFocus();
    };
  }, [loadProducts, navigation]);

  useEffect(() => {
    setIsLoading(true);
    loadProducts().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadProducts]);

  if (error) {
    return <ErrorView retry={loadProducts} />;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (products.length < 1) {
    return <CenteredView message="No product is available!" />;
  }

  const productPressHandler = (product: Product) => {
    navigation.navigate('ProductDetails', {
      productId: product.id,
      productTitle: product.title,
    });
  };

  const addToCard = (product: Product) => {
    dispatch(cartActions.addToCart(product));
  };

  return (
    <FlatList<Product>
      onRefresh={loadProducts}
      refreshing={isRefreshing}
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

export const ProductsOverviewScreenOptions = (navData: any) => {
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

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
