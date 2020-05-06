import React, { useCallback, useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, Button, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

import { IRootState } from '../../store/states';
import Fonts from '../../constants/Fonts';
import currency from '../../helpers/currency';
import * as orderActions from '../../store/actions/orders';
import Card from '../../components/Card';
import { Order } from '../../models/order';
import date from '../../helpers/date';
import OrderDetails from '../../components/shop/OrderDetails';
import DefaultHeaderLeft from '../../components/default/DefaultHeaderLeft';
import ErrorView from '../../components/ErrorView';
import Loader from '../../components/Loader';
import CenteredView from '../../components/CenteredView';

type Params = {};

type ScreenProps = {};

const OrdersScreen: NavigationStackScreenComponent<Params, ScreenProps> = ({
  navigation,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const ownerId = 'u1';

  const dispatch = useDispatch();

  const loadOrders = useCallback(async () => {
    setError('');
    setIsLoading(true);
    try {
      await dispatch(orderActions.getOrders(ownerId));
    } catch (err) {
      setError(err.message);
    }
    setIsLoading(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusListener = navigation.addListener('willFocus', loadOrders);

    return () => {
      willFocusListener.remove();
    };
  }, [loadOrders, navigation]);

  useEffect(() => {
    loadOrders();
  }, [dispatch, loadOrders]);

  const orders = useSelector<IRootState, Order[]>(
    (state) => state.orders.orders
  );

  if (error) {
    return <ErrorView retry={loadOrders} />;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (orders.length < 1) {
    return <CenteredView message="No order is available!" />;
  }

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
