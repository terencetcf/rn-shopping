import React from 'react';
import { StyleSheet, Text, View, Image, Button } from 'react-native';
import Product from '../../models/product';
import currency from '../../helpers/currency';
import Colors from '../../constants/Colors';
import DefaultTouchable from '../default/DefaultTouchable';
import Fonts from '../../constants/Fonts';

type Props = {
  product: Product;
  onPressViewDetails: () => void;
  onPressAddToCard: () => void;
};

const ProductItem: React.FC<Props> = ({
  product,
  onPressViewDetails,
  onPressAddToCard,
}) => {
  return (
    <View style={styles.product}>
      <View style={styles.touchable}>
        <DefaultTouchable onPress={() => onPressViewDetails()} useForeground>
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
            <View style={styles.actions}>
              <Button
                color={Colors.primary}
                title="View Details"
                onPress={() => onPressViewDetails()}
              />
              <Button
                color={Colors.primary}
                title="To Card"
                onPress={() => onPressAddToCard()}
              />
            </View>
          </View>
        </DefaultTouchable>
      </View>
    </View>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  product: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
    height: 300,
    margin: 20,
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
    height: '15%',
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
    height: '25%',
    paddingHorizontal: 20,
  },
});
