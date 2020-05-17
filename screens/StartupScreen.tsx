import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';
import { useDispatch } from 'react-redux';

import Colors from '../constants/Colors';
import * as authActions from '../store/actions/auth';
import moment from 'moment';

const StartupScreen = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const tryLogin = async () => {
      const userData = await AsyncStorage.getItem('userData');
      if (!userData) {
        dispatch(authActions.setDidTryAutoLogin());
        return;
      }

      const parsedData = JSON.parse(userData as string);

      const { token, userId, expiryDate } = parsedData;
      const expirationDate = moment(expiryDate);

      if (expirationDate.isBefore(moment.utc()) || !token || !userId) {
        dispatch(authActions.setDidTryAutoLogin());
        return;
      }

      dispatch(authActions.authenticate(token, userId, expirationDate));
    };

    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

export default StartupScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
