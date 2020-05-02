import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import Colors from '../constants/Colors';
import device from '../helpers/device';
import ProductDetailsScreen from '../screens/shop/ProductDetailScreen';

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: ProductsOverviewScreen as any,
    ProductDetails: ProductDetailsScreen as any,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: device.isAndroid() ? Colors.primary : '',
      },
      headerTintColor: device.isAndroid() ? 'white' : Colors.primary,
    },
  }
);

export default createAppContainer(ProductsNavigator);
