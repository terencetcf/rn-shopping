import { AsyncStorage } from 'react-native';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import moment from 'moment';

import apiHelper from '../../helpers/api-helper';
import dateHelper from '../../helpers/date-helper';

export enum AuthActions {
  SIGN_UP = 'SIGN_UP',
  AUTHENTICATE = 'AUTHENTICATE',
  LOGIN = 'LOGIN',
  LOGOUT = 'LOGOUT',
}

interface authenticate {
  type: typeof AuthActions.AUTHENTICATE;
  token: string;
  userId: string;
}
interface signUp {
  type: typeof AuthActions.SIGN_UP;
  token: string;
  userId: string;
}
interface login {
  type: typeof AuthActions.LOGIN;
  token: string;
  userId: string;
}

interface logout {
  type: typeof AuthActions.LOGOUT;
}

export type AuthActionTypes = authenticate | signUp | login | logout;

export const authenticate = (
  token: string,
  userId: string,
  expiryDate: moment.Moment
) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    saveDataToStorage(token, userId, expiryDate);
    const expiresIn = expiryDate.diff(moment.utc(), 'ms');
    dispatch(setLogoutTimer(expiresIn));
    dispatch({
      type: AuthActions.AUTHENTICATE,
      token,
      userId,
    });
  };
};

export const signUp = (email: string, password: string) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const data = await apiHelper.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBJR-Nyya179ioUIGiT2zzi0tFSwU215IE`,
      {
        email,
        password,
        returnSecureToken: true,
      },
      undefined,
      false
    );

    if (data.error && data.error.message) {
      switch (data.error.message) {
        case 'EMAIL_EXISTS':
          throw new Error('This email already exists!');

        default:
          console.log(data);
          throw new Error('Something went wrong...');
      }
    }

    const expiryDate = moment.utc().add(data.expiresIn, 'seconds');

    dispatch(authenticate(data.idToken, data.localId, expiryDate));
  };
};

export const login = (email: string, password: string) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const data = await apiHelper.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBJR-Nyya179ioUIGiT2zzi0tFSwU215IE`,
      {
        email,
        password,
        returnSecureToken: true,
      },
      undefined,
      false
    );

    if (data.error && data.error.message) {
      switch (data.error.message) {
        case 'EMAIL_NOT_FOUND':
        case 'INVALID_EMAIL':
          throw new Error('This email could not be found!');

        case 'INVALID_PASSWORD':
          throw new Error('This password is not valid!');

        default:
          throw new Error('Something went wrong...');
      }
    }

    const expiryDate = dateHelper.toNewUtcDate(data.expiresIn, 's');

    dispatch(authenticate(data.idToken, data.localId, expiryDate));
  };
};

export const logout = () => {
  clearLogoutTimer();
  AsyncStorage.removeItem('userData');
  return { type: AuthActions.LOGOUT };
};

let timer: NodeJS.Timer;

const clearLogoutTimer = () => {
  if (timer) {
    clearTimeout(timer);
  }
};

const setLogoutTimer = (expirationTime: number) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    timer = setTimeout(() => {
      dispatch(logout());
    }, expirationTime);
  };
};

const saveDataToStorage = (
  token: string,
  userId: string,
  expiryDate: moment.Moment
) => {
  AsyncStorage.setItem(
    'userData',
    JSON.stringify({
      token,
      userId,
      expiryDate: expiryDate.toISOString(),
    })
  );
};
