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
} from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { LinearGradient } from 'expo-linear-gradient';

import Card from '../../components/Card';
import TextField from '../../components/TextField';
import Colors from '../../constants/Colors';
import { useDispatch } from 'react-redux';
import * as authActions from '../../store/actions/auth';

type Params = {};

type ScreenProps = {};

const AuthScreen: NavigationStackScreenComponent<Params, ScreenProps> = ({
  navigation,
  ...props
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [error, setError] = useState<string>('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
    } catch {
      setError(`Unable to ${isSignUp ? 'Sign Up' : 'login'}...`);
    }

    setIsLoading(false);
  }, [dispatch, email, password]);

  useEffect(() => {
    if (error) {
      Alert.alert(error);
    }
  }, [error]);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <ImageBackground
        source={{
          uri:
            'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQTCCBYb74s3_TOfSXuyWzmYIG0UyJVaJ98S9V8yae4CGFvQeqv&usqp=CAU',
        }}
        style={styles.background}
      >
        <LinearGradient
          colors={['#rgba(0, 0, 0, 0.1)', 'rgba(10, 10, 10, 0.1)']}
          style={styles.gradient}
        >
          <Card style={styles.form}>
            <ScrollView>
              <TextField
                label="Email"
                value={email}
                keyboardType="email-address"
                autoCapitalize="none"
                labelStyle={styles.label}
                style={styles.field}
                validate={() => email.length > 0 && email.indexOf('@') >= 0}
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
                validate={() => password.length > 5}
                onChangeText={(text) => setPassword(text)}
                required
              />
              <View style={styles.button}>
                <Button
                  title={isSignUp ? 'Sign Up' : 'Login'}
                  color={Colors.primary}
                  onPress={authHandler}
                  disabled={isLoading}
                />
              </View>
              <View style={styles.button}>
                <Button
                  title={`Switch to ${isSignUp ? 'Login' : 'Sign Up'} mode`}
                  color={Colors.transparentWhite}
                  onPress={() => {
                    setIsSignUp((prev) => !prev);
                  }}
                  disabled={isLoading}
                />
              </View>
            </ScrollView>
          </Card>
        </LinearGradient>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

AuthScreen.navigationOptions = (navData) => {
  return {
    headerTitle: 'Authentication',
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
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  form: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 400,
    padding: 30,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  label: {
    color: Colors.transparentWhite,
  },
  field: {
    color: Colors.transparentWhite,
    borderBottomColor: Colors.transparentWhite,
  },
  button: {
    marginBottom: 10,
  },
});
