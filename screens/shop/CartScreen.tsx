import React from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import { IRootState } from '../../store/states';
import Fonts from '../../constants/Fonts';
import { ICartItem } from '../../models/cart-Item';
import Colors from '../../constants/Colors';
import currency from '../../helpers/currency';
import CartItem from '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/cart';
import * as orderActions from '../../store/actions/orders';
import Card from '../../components/Card';
import { Order } from '../../models/order';

type Params = {};

type ScreenProps = {};

const CartScreen: NavigationStackScreenComponent<Params, ScreenProps> = ({
  navigation,
  ...props
}) => {
  const cartItems = useSelector<IRootState, ICartItem[]>(
    (state) => state.cart.items
  );

  const totalAmount = useSelector<IRootState, number>(
    (state) => state.cart.totalAmount
  );

  const dispatch = useDispatch();

  const removeFromCart = (productId: string) => {
    dispatch(cartActions.removeFromCard(productId));
  };

  const increaseCartItemQuantity = (productId: string) => {
    dispatch(cartActions.increaseCartQuantity(productId));
  };

  const decreaseCartItemQuantity = (productId: string) => {
    dispatch(cartActions.decreaseCartQuantity(productId));
  };

  const orderNow = () => {
    const order = new Order(cartItems, totalAmount);
    dispatch(orderActions.addOrder(order));
  };

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.amount}>{currency.toString(totalAmount)}</Text>
        </Text>
        <Button
          color={Colors.accent}
          title="Order Now"
          onPress={() => orderNow()}
          disabled={cartItems.length < 1}
        />
      </View>
      <Card title="CART ITEMS">
        <FlatList<ICartItem>
          keyExtractor={(item) => item.productId}
          data={cartItems}
          renderItem={(itemData) => (
            <CartItem
              cartItem={itemData.item}
              onPressAdd={() =>
                increaseCartItemQuantity(itemData.item.productId)
              }
              onPressReduce={() =>
                decreaseCartItemQuantity(itemData.item.productId)
              }
              onPressRemove={() => removeFromCart(itemData.item.productId)}
            />
          )}
        />
      </Card>
    </View>
  );
};

CartScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Your Cart',
  };
};

export default CartScreen;

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
  summaryText: {
    fontFamily: Fonts.bold,
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
});
