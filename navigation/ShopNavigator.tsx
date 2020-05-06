import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { Ionicons } from '@expo/vector-icons';

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
  }
);

const AuthNavigator = createStackNavigator(
  {
    Auth: AuthScreen as any,
  },
  { defaultNavigationOptions }
);

const MainNavigator = createSwitchNavigator({
  Auth: AuthNavigator,
  Shop: ShopNavigator,
});

export default createAppContainer(MainNavigator);
