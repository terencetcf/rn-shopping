import React from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '../store/states';
import { NavigationContainer } from '@react-navigation/native';

import { ShopNavigator, AuthNavigator } from './ShopNavigator';
import StartupScreen from '../screens/StartupScreen';

const AppContainer = () => {
  const isAuth = useSelector<IRootState>((state) => !!state.auth.token);
  const didTryAutoLogin = useSelector<IRootState>(
    (state) => !!state.auth.didTryAutoLogin
  );

  return (
    <NavigationContainer>
      {isAuth && <ShopNavigator />}
      {!isAuth && didTryAutoLogin && <AuthNavigator />}
      {!isAuth && !didTryAutoLogin && <StartupScreen />}
    </NavigationContainer>
  );
};

export default AppContainer;
