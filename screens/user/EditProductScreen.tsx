import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  FlatList,
  ScrollView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import { IRootState } from '../../store/states';
import Colors from '../../constants/Colors';
import Product from '../../models/product';
import ProductItem from '../../components/shop/ProductItem';
import DefaultHeaderLeft from '../../components/default/DefaultHeaderLeft';
import { deleteProduct } from '../../store/actions/products';
import DefaultHeaderButtons from '../../components/default/DefaultHeaderButtons';
import TextField from '../../components/TextField';

type Params = {
  productId: string;
  productTitle: string;
};

type ScreenProps = {};

const EditProductScreen: NavigationStackScreenComponent<
  Params,
  ScreenProps
> = ({ navigation, ...props }) => {
  const productId = navigation.getParam('productId');
  const product = useSelector<IRootState, Product | undefined>((state) =>
    state.products.userProducts.find((p) => p.id === productId)
  );

  const dispatch = useDispatch();

  return (
    <ScrollView>
      <View style={styles.form}>
        <TextField label="Title" />
        <TextField label="Image URL" />
        <TextField label="Price" />
        <TextField label="Description" />
      </View>
    </ScrollView>
  );
};

EditProductScreen.navigationOptions = (navData) => {
  const headerTitle = navData.navigation.getParam('productTitle');

  return {
    headerTitle,
  };
};

export default EditProductScreen;

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
});
