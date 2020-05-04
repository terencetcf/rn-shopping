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
import date from '../../helpers/date';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../../UI/HeaderButton';
import device from '../../helpers/device';
import OrderDetails from '../../components/shop/OrderDetails';
import DefaultHeaderLeft from '../../components/default/DefaultHeaderLeft';

type Params = {};

type ScreenProps = {};

const OrdersScreen: NavigationStackScreenComponent<Params, ScreenProps> = ({
  navigation,
  ...props
}) => {
  const orders = useSelector<IRootState, Order[]>(
    (state) => state.orders.orders
  );

  if (orders.length < 1) {
    return (
      <View style={styles.noOrderContainer}>
        <Text>You do not have any order yet!</Text>
      </View>
    );
  }

  const dispatch = useDispatch();

  return (
    <FlatList<Order>
      keyExtractor={(item) => item.id}
      data={orders}
      renderItem={(itemData) => (
        <View style={styles.container}>
          <Card title={`Order ID: ${itemData.item.id}`}>
            <View style={styles.detailsRow}>
              <Text style={styles.details}>Order Date:</Text>
              <Text style={styles.details}>
                {date.toDateTimeString(itemData.item.date)}
              </Text>
            </View>
            <View style={styles.detailsRow}>
              <Text style={styles.details}>Total Amount:</Text>
              <Text style={styles.details}>
                {currency.toString(itemData.item.totalAmount)}
              </Text>
            </View>
            <OrderDetails items={itemData.item.items} />
          </Card>
        </View>
      )}
    />
  );
};

OrdersScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Your Orders',
    headerLeft: () => <DefaultHeaderLeft navData={navData} />,
  };
};

export default OrdersScreen;

const styles = StyleSheet.create({
  noOrderContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    padding: 20,
  },
  detailsRow: {
    flexDirection: 'row',
    marginVertical: 5,
    justifyContent: 'space-between',
  },
  details: {
    fontFamily: Fonts.bold,
    fontSize: 15,
  },
});
