import React from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import { IRootState } from '../../store/states';
import Colors from '../../constants/Colors';
import Product from '../../models/product';
import ProductItem from '../../components/shop/ProductItem';
import DefaultHeaderLeft from '../../components/default/DefaultHeaderLeft';
import { deleteProduct } from '../../store/actions/products';
import DefaultHeaderButtons from '../../components/default/DefaultHeaderButtons';

type Params = {};

type ScreenProps = {};

const UserProductsScreen: NavigationStackScreenComponent<
  Params,
  ScreenProps
> = ({ navigation, ...props }) => {
  const products = useSelector<IRootState, Product[]>(
    (state) => state.products.userProducts
  );

  const dispatch = useDispatch();

  const editButtonHandler = (product: Product) => {
    navigation.navigate({
      routeName: 'EditProduct',
      params: { productId: product.id, productTitle: product.title },
    });
  };

  const deleteButtonHandler = (productId: string) => {
    dispatch(deleteProduct(productId));
  };

  return (
    <FlatList
      data={products}
      renderItem={(itemData) => (
        <ProductItem
          product={itemData.item}
          onPress={() => {
            editButtonHandler(itemData.item);
          }}
        >
          <Button
            color={Colors.primary}
            title="Edit"
            onPress={() => editButtonHandler(itemData.item)}
          />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => deleteButtonHandler(itemData.item.id)}
          />
        </ProductItem>
      )}
    />
  );
};

UserProductsScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'User Products',
    headerLeft: () => <DefaultHeaderLeft navData={navData} />,
    headerRight: () => (
      <DefaultHeaderButtons
        navData={navData}
        title="Add New Product"
        iconName="ios-create"
        iconNameAndroid="md-create"
        onPress={() => {
          console.log('add');
        }}
      />
    ),
  };
};

export default UserProductsScreen;

const styles = StyleSheet.create({});
