import React, { useCallback, useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Button,
  FlatList,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { StackScreenProps } from '@react-navigation/stack';

import { IRootState } from '../../store/states';
import Fonts from '../../constants/Fonts';
import { ICartItem } from '../../models/cart-Item';
import Colors from '../../constants/Colors';
import currency from '../../helpers/currency';
import CartItem from '../../components/shop/CartItem';
import * as cartActions from '../../store/actions/cart';
import * as orderActions from '../../store/actions/orders';
import * as authActions from '../../store/actions/auth';
import Card from '../../components/Card';
import { Order } from '../../models/order';
import { RootStackNavigatorParamList } from '../../navigation/ShopNavigator';

interface IProps extends StackScreenProps<RootStackNavigatorParamList> {}

const CartScreen: React.FC<IProps> = ({ navigation, ...props }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
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

  const logout = () => {
    dispatch(authActions.logout());
  };

  const orderNow = useCallback(async () => {
    setError('');
    setIsLoading(true);
    let errorOcurred = false;
    const order = new Order(cartItems, totalAmount);
    try {
      await dispatch(orderActions.addOrder(order));
    } catch (err) {
      setError(err.message);
      errorOcurred = true;
    }

    setIsLoading(false);
    if (!errorOcurred) {
      Alert.alert(
        'Ordered completed',
        'Your order has been successfully placed!',
        [{ text: 'Ok', style: 'default' }]
      );
      navigation.popToTop();
      navigation.navigate('Orders');
    }
  }, [dispatch, cartItems, totalAmount]);

  useEffect(() => {
    if (error) {
      Alert.alert(
        'Error occurred!',
        'Unable to submit the order, please try again later',
        [{ text: 'Ok', style: 'default' }]
      );
    }
  }, [error]);

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{' '}
          <Text style={styles.amount}>{currency.toString(totalAmount)}</Text>
        </Text>
        {isLoading ? (
          <ActivityIndicator size="small" color={Colors.primary} />
        ) : (
          <Button
            color={Colors.accent}
            title="Order Now"
            onPress={orderNow}
            disabled={cartItems.length < 1}
          />
        )}
      </Card>
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

export const CartScreenOptions = (navData: any) => {
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
  },
  summaryText: {
    fontFamily: Fonts.bold,
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
});
