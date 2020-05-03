import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import { IRootState } from '../../store/states';
import Product from '../../models/product';
import { ScrollView } from 'react-native-gesture-handler';
import currency from '../../helpers/currency';
import Colors from '../../constants/Colors';
import Fonts from '../../constants/Fonts';
import * as cartActions from '../../store/actions/cart';

type Params = {
  productId: string;
  productTitle: string;
};

type ScreenProps = {};

const ProductDetailsScreen: NavigationStackScreenComponent<
  Params,
  ScreenProps
> = ({ navigation, ...props }) => {
  const productId = navigation.getParam('productId');

  const selectedProduct = useSelector<IRootState, Product | undefined>(
    (state) =>
      state.products.availableProducts.find(
        (product) => product.id === productId
      )
  );

  if (!selectedProduct) {
    return (
      <View>
        <Text>Unable to find the selected product!</Text>
      </View>
    );
  }

  const dispatch = useDispatch();

  const addToCard = (product: Product) => {
    dispatch(cartActions.addToCart(product));
  };

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.actions}>
        <Button
          color={Colors.primary}
          title="Add to Card"
          onPress={() => addToCard(selectedProduct)}
        />
      </View>
      <Text style={styles.price}>
        {currency.toString(selectedProduct.price)}
      </Text>
      <Text style={styles.description}>{selectedProduct.description}</Text>
    </ScrollView>
  );
};

ProductDetailsScreen.navigationOptions = (navData) => {
  const selectedProductTitle = navData.navigation.getParam('productTitle');

  return {
    headerTitle: selectedProductTitle,
  };
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  actions: {
    marginVertical: 10,
    alignItems: 'center',
  },
  price: {
    fontFamily: Fonts.bold,
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 20,
  },
});
