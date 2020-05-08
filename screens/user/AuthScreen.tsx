import React, { useState, useCallback, useEffect } from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  View,
  Button,
  ImageBackground,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { LinearGradient } from 'expo-linear-gradient';

import TextField from '../../components/TextField';
import Colors from '../../constants/Colors';
import { useDispatch } from 'react-redux';

import * as authActions from '../../store/actions/auth';
import DefaultTouchable from '../../components/default/DefaultTouchable';
import device from '../../helpers/device';
import validator from '../../helpers/validator';
import Fonts from '../../constants/Fonts';

type Params = {};

type ScreenProps = {};

const AuthScreen: NavigationStackScreenComponent<Params, ScreenProps> = ({
  navigation,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('1@test.com');
  const [password, setPassword] = useState('123456');

  const dispatch = useDispatch();
  const authHandler = useCallback(async () => {
    setError('');
    setIsLoading(true);
    try {
      if (isSignUp) {
        await dispatch(authActions.signUp(email, password));
      } else {
        await dispatch(authActions.login(email, password));
      }

      navigation.navigate('Shop');
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  }, [dispatch, email, password]);

  useEffect(() => {
    setIsValid(validator.isEmail(email) && validator.hasMinChar(password, 6));
  }, [email, password]);

  useEffect(() => {
    if (error) {
      Alert.alert(error);
    }
  }, [error]);

  const getModeText = (isSignUpMode: boolean) =>
    isSignUpMode ? 'Sign Up' : 'Login';

  return (
    <ImageBackground
      source={require('../../assets/bg.jpg')}
      style={styles.background}
    >
      <LinearGradient
        colors={['#rgba(0, 0, 0, 0.5)', 'rgba(10, 10, 10, 0.2)']}
        style={styles.gradient}
      >
        <KeyboardAvoidingView
          behavior="padding"
          keyboardVerticalOffset={25}
          style={styles.screen}
        >
          {!isLoading ? (
            <ScrollView style={styles.form}>
              <Text style={styles.title}>
                {isSignUp
                  ? 'Please fill in details to sign up'
                  : 'Authentication'}
              </Text>
              <TextField
                label="Email"
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
                labelStyle={styles.label}
                style={styles.field}
                validate={() => validator.isEmail(email)}
                onChangeText={(text) => setEmail(text)}
                required
              />
              <TextField
                label="Password"
                value={password}
                secureTextEntry={true}
                autoCapitalize="none"
                labelStyle={styles.label}
                style={styles.field}
                validate={() => validator.hasMinChar(password, 6)}
                onChangeText={(text) => setPassword(text)}
                required
              />
              <View style={styles.button}>
                <Button
                  title={getModeText(isSignUp)}
                  color={
                    device.isAndroid()
                      ? Colors.primary
                      : Colors.transparentWhite
                  }
                  onPress={authHandler}
                  disabled={!isValid}
                />
              </View>
            </ScrollView>
          ) : (
            <View style={styles.loading}>
              <Text style={styles.loadingText}>Signing in...</Text>
              <ActivityIndicator size="large" />
            </View>
          )}
        </KeyboardAvoidingView>
      </LinearGradient>
      {!isLoading && (
        <DefaultTouchable
          onPress={() => {
            setIsSignUp((prev) => !prev);
          }}
        >
          <Text style={styles.switch}>{`Switch to ${getModeText(
            !isSignUp
          )} mode`}</Text>
        </DefaultTouchable>
      )}
    </ImageBackground>
  );
};

AuthScreen.navigationOptions = (navData) => {
  return {
    headerTitle: '',
    headerTintColor: Colors.transparentWhite,
    headerTransparent: true,
  };
};

export default AuthScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  gradient: {
    flex: 1,
    width: '80%',
    maxWidth: 400,
    maxHeight: 350,
    borderRadius: 10,
  },
  form: {
    flex: 1,
    padding: 30,
  },
  title: {
    color: Colors.transparentWhite,
    fontSize: 12,
    fontFamily: Fonts.regular,
    fontStyle: 'italic',
    marginBottom: 30,
    textAlign: 'right',
  },
  label: {
    color: Colors.transparentWhite,
  },
  field: {
    color: Colors.transparentWhite,
    borderBottomColor: Colors.transparentWhite,
  },
  button: {
    marginTop: 10,
    backgroundColor: 'rgba(194,24,91,0.9)',
    borderRadius: 5,
  },
  switch: {
    marginTop: 10,
    fontSize: 12,
    color: Colors.transparentWhite,
  },
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: 'rgba(255, 255, 255, 0.6)',
    marginBottom: 20,
  },
});
