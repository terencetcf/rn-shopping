import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import {
  createDrawerNavigator,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import { View, SafeAreaView, Button } from 'react-native';
import { useDispatch } from 'react-redux';

import ProductsOverviewScreen, {
  ProductsOverviewScreenOptions,
} from '../screens/shop/ProductsOverviewScreen';
import Colors from '../constants/Colors';
import device from '../helpers/device';
import ProductDetailsScreen, {
  ProductDetailsScreenOptions,
} from '../screens/shop/ProductDetailScreen';
import Fonts from '../constants/Fonts';
import CartScreen, { CartScreenOptions } from '../screens/shop/CartScreen';
import OrdersScreen, {
  OrdersScreenOptions,
} from '../screens/shop/OrdersScreen';
import UserProductsScreen, {
  UserProductsScreenOptions,
} from '../screens/user/UserProductsScreen';
import EditProductScreen, {
  EditProductScreenOptions,
} from '../screens/user/EditProductScreen';
import AuthScreen, { AuthScreenOptions } from '../screens/user/AuthScreen';
import * as authActions from '../store/actions/auth';

export type RootStackNavigatorParamList = ProductsStackNavigatorParamList &
  OrdersStackNavigatorParamList &
  AdminStackNavigatorParamList &
  AuthStackNavigatorParamList;

const defaultScreenOptions = {
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

export type ProductsStackNavigatorParamList = {
  ProductsOverview: undefined;
  ProductDetails: { productId: string; productTitle: string };
  Cart: undefined;
};

const ProductsStackNavigator = createStackNavigator<
  ProductsStackNavigatorParamList
>();

export const ProductsNavigator = () => {
  return (
    <ProductsStackNavigator.Navigator screenOptions={defaultScreenOptions}>
      <ProductsStackNavigator.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={ProductsOverviewScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={ProductDetailsScreenOptions}
      />
      <ProductsStackNavigator.Screen
        name="Cart"
        component={CartScreen}
        options={CartScreenOptions}
      />
    </ProductsStackNavigator.Navigator>
  );
};

export type OrdersStackNavigatorParamList = {
  Orders: undefined;
};

const OrdersStackNavigator = createStackNavigator<
  OrdersStackNavigatorParamList
>();

export const OrdersNavigator = () => {
  return (
    <OrdersStackNavigator.Navigator screenOptions={defaultScreenOptions}>
      <OrdersStackNavigator.Screen
        name="Orders"
        component={OrdersScreen}
        options={OrdersScreenOptions}
      />
    </OrdersStackNavigator.Navigator>
  );
};

export type AdminStackNavigatorParamList = {
  UserProducts: undefined;
  EditProduct: {
    productId: string;
    productTitle: string;
  };
};

const AdminStackNavigator = createStackNavigator<
  AdminStackNavigatorParamList
>();

export const AdminNavigator = () => {
  return (
    <AdminStackNavigator.Navigator screenOptions={defaultScreenOptions}>
      <AdminStackNavigator.Screen
        name="UserProducts"
        component={UserProductsScreen}
        options={UserProductsScreenOptions}
      />
      <AdminStackNavigator.Screen
        name="EditProduct"
        component={EditProductScreen}
        options={EditProductScreenOptions}
      />
    </AdminStackNavigator.Navigator>
  );
};

export type ShopDrawerNavigatorParamList = {
  Products: undefined;
  Orders: undefined;
  Admin: undefined;
};

const ShopDrawerNavigator = createDrawerNavigator<
  ShopDrawerNavigatorParamList
>();

export const ShopNavigator = () => {
  const dispatch = useDispatch();
  return (
    <ShopDrawerNavigator.Navigator
      drawerContentOptions={{
        activeTintColor: Colors.primary,
      }}
      drawerContent={(props) => (
        <View style={{ flex: 1 }}>
          <SafeAreaView
          // forceInset={{top: 'always', horizontal: 'never'}}
          >
            <DrawerItemList {...props} />
            <Button
              title="Logout"
              color={Colors.primary}
              onPress={() => {
                dispatch(authActions.logout());
              }}
            />
          </SafeAreaView>
        </View>
      )}
    >
      <ShopDrawerNavigator.Screen
        name="Products"
        component={ProductsNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={device.isAndroid() ? 'md-cart' : 'ios-cart'}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Orders"
        component={OrdersNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={device.isAndroid() ? 'md-list' : 'ios-list'}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
      <ShopDrawerNavigator.Screen
        name="Admin"
        component={AdminNavigator}
        options={{
          drawerIcon: (props) => (
            <Ionicons
              name={device.isAndroid() ? 'md-create' : 'ios-create'}
              size={23}
              color={props.color}
            />
          ),
        }}
      />
    </ShopDrawerNavigator.Navigator>
  );
};

export type AuthStackNavigatorParamList = {
  Auth: undefined;
};

const AuthStackNavigator = createStackNavigator<AuthStackNavigatorParamList>();

export const AuthNavigator = () => {
  return (
    <AuthStackNavigator.Navigator screenOptions={defaultScreenOptions}>
      <AuthStackNavigator.Screen
        name="Auth"
        component={AuthScreen}
        options={AuthScreenOptions}
      />
    </AuthStackNavigator.Navigator>
  );
};
