import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import { useSelector } from 'react-redux';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import { IRootState } from '../../store/states';
import Product from '../../models/product';
import { NavigationScreenConfigProps } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
import currency from '../../helpers/currency';
import Colors from '../../constants/Colors';

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

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: selectedProduct.imageUrl }} />
      <View style={styles.actions}>
        <Button color={Colors.primary} title="Add to Card" onPress={() => {}} />
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
