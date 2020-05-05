import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import Product from '../../models/product';
import currency from '../../helpers/currency';
import DefaultTouchable from '../default/DefaultTouchable';
import Fonts from '../../constants/Fonts';
import Card from '../Card';

type Props = {
  product: Product;
  onPress: () => void;
};

const ProductItem: React.FC<Props> = ({ product, onPress, ...props }) => {
  return (
    <Card style={styles.card}>
      <View style={styles.touchable}>
        <DefaultTouchable onPress={() => onPress()} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image source={{ uri: product.imageUrl }} style={styles.image} />
            </View>
            <View style={styles.details}>
              <Text style={styles.title}>{product.title}</Text>
              <Text style={styles.price}>
                {currency.toString(product.price)}
              </Text>
            </View>
            <View style={styles.actions}>{props.children}</View>
          </View>
        </DefaultTouchable>
      </View>
    </Card>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  card: {
    height: 300,
    margin: 20,
    padding: 0,
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  details: {
    alignItems: 'center',
    height: '17%',
    padding: 10,
  },
  title: {
    fontFamily: Fonts.bold,
    fontSize: 18,
    marginVertical: 2,
  },
  price: {
    fontFamily: Fonts.regular,
    fontSize: 14,
    color: '#888',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '23%',
    paddingHorizontal: 20,
  },
});
