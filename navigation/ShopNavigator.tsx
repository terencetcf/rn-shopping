import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {
  createDrawerNavigator,
  DrawerNavigatorItems,
} from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';
import { View, SafeAreaView, Button } from 'react-native';
import { useDispatch } from 'react-redux';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import Colors from '../constants/Colors';
import device from '../helpers/device';
import ProductDetailsScreen from '../screens/shop/ProductDetailScreen';
import Fonts from '../constants/Fonts';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import UserProductsScreen from '../screens/user/UserProductsScreen';
import EditProductScreen from '../screens/user/EditProductScreen';
import AuthScreen from '../screens/user/AuthScreen';
import StartupScreen from '../screens/StartupScreen';
import * as authActions from '../store/actions/auth';

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: device.isAndroid() ? Colors.primary : '',
  },
  headerTitleStyle: {
    fontFamily: Fonts.bold,
  },
  headerBackTitleStyle: {
    fontFamily: Fonts.regular,
  },
  headerTintColor: device.isAndroid() ? 'white' : Colors.primary,
};

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen as any,
    ProductDetails: ProductDetailsScreen as any,
    Cart: CartScreen as any,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig: any) => (
        <Ionicons
          name={device.isAndroid() ? 'md-cart' : 'ios-cart'}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions,
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen as any,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig: any) => (
        <Ionicons
          name={device.isAndroid() ? 'md-list' : 'ios-list'}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions,
  }
);

const AdminNavigator = createStackNavigator(
  {
    UserProducts: UserProductsScreen as any,
    EditProduct: EditProductScreen as any,
  },
  {
    navigationOptions: {
      drawerIcon: (drawerConfig: any) => (
        <Ionicons
          name={device.isAndroid() ? 'md-create' : 'ios-create'}
          size={23}
          color={drawerConfig.tintColor}
        />
      ),
    },
    defaultNavigationOptions,
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    Orders: OrdersNavigator,
    Admin: AdminNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    },
    contentComponent: (props) => {
      const dispatch = useDispatch();
      return (
        <View style={{ flex: 1 }}>
          <SafeAreaView
          // forceInset={{top: 'always', horizontal: 'never'}}
          >
            <DrawerNavigatorItems {...props} />
            <Button
              title="Logout"
              color={Colors.primary}
              onPress={() => {
                dispatch(authActions.logout());
                props.navigation.navigate('Auth');
              }}
            />
          </SafeAreaView>
        </View>
      );
    },
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen as any,
  },
  { defaultNavigationOptions }
);

const MainNavigator = createSwitchNavigator({
  Startup: StartupScreen,
  Auth: AuthNavigator,
  Shop: ShopNavigator,
});

export default createAppContainer(MainNavigator);
