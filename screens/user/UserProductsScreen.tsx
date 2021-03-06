import React from 'react';
import { StyleSheet, Button, FlatList, Alert } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { StackScreenProps } from '@react-navigation/stack';

import { IRootState } from '../../store/states';
import Colors from '../../constants/Colors';
import Product from '../../models/product';
import ProductItem from '../../components/shop/ProductItem';
import DefaultHeaderLeft from '../../components/default/DefaultHeaderLeft';
import { deleteProduct } from '../../store/actions/products';
import DefaultHeaderButtons from '../../components/default/DefaultHeaderButtons';
import CenteredView from '../../components/CenteredView';
import { RootStackNavigatorParamList } from '../../navigation/ShopNavigator';

interface IProps extends StackScreenProps<RootStackNavigatorParamList> {}

const UserProductsScreen: React.FC<IProps> = ({ navigation, ...props }) => {
  const products = useSelector<IRootState, Product[]>(
    (state) => state.products.userProducts
  );

  const dispatch = useDispatch();

  if (products.length < 1) {
    return <CenteredView message="No product is available!" />;
  }

  const editButtonHandler = (product: Product) => {
    navigation.navigate('EditProduct', {
      productId: product.id,
      productTitle: product.title,
    });
  };

  const deleteButtonHandler = (productId: string) => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      {
        text: 'No',
        style: 'default',
      },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(deleteProduct(productId));
        },
      },
    ]);
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

export const UserProductsScreenOptions = (navData: any) => {
  return {
    headerTitle: 'User Products',
    headerLeft: () => <DefaultHeaderLeft navData={navData} />,
    headerRight: () => (
      <DefaultHeaderButtons
        title="Add New Product"
        iconName="ios-create"
        iconNameAndroid="md-create"
        onPress={() => {
          navData.navigation.navigate('EditProduct');
        }}
      />
    ),
  };
};

export default UserProductsScreen;

const styles = StyleSheet.create({});
