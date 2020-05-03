import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import currency from '../../helpers/currency';
import Fonts from '../../constants/Fonts';
import { ICartItem } from '../../models/cart-Item';
import IconButton from '../IconButton';
import Colors from '../../constants/Colors';

interface Props {
  cartItem: ICartItem;
  onPressRemove?: () => void;
  onPressAdd?: () => void;
  onPressReduce?: () => void;
}

const CartItem: React.FC<Props> = ({
  cartItem,
  onPressRemove,
  onPressAdd,
  onPressReduce,
}) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        {onPressAdd && onPressReduce && (
          <>
            <IconButton
              style={styles.button}
              onPress={onPressAdd}
              iconName="ios-add"
              iconNameAndroid="md-add"
              color={Colors.darkGrey}
            />
            <IconButton
              style={styles.button}
              onPress={onPressReduce}
              iconName="ios-remove"
              iconNameAndroid="md-remove"
              color={Colors.darkGrey}
            />
          </>
        )}
        <Text style={styles.quantity}>{cartItem.quantity} </Text>
        <Text style={styles.mainText}>x {cartItem.productTitle}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.mainText}>
          {currency.toString(cartItem.productPrice * cartItem.quantity)}
        </Text>
        {onPressRemove && (
          <IconButton
            style={styles.deleteButton}
            onPress={onPressRemove}
            iconName="ios-trash"
            iconNameAndroid="md-trash"
            color="red"
          />
        )}
      </View>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  cartItem: {
    paddingVertical: 5,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantity: {
    fontFamily: Fonts.bold,
    color: '#555',
    fontSize: 16,
    marginHorizontal: 5,
  },
  mainText: {
    fontFamily: Fonts.regular,
    fontSize: 16,
  },
  button: {
    backgroundColor: Colors.lightGrey,
  },
  deleteButton: {
    marginLeft: 10,
  },
});
