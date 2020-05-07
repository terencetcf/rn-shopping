import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import apiHelper from '../../helpers/api-helper';

export enum AuthActions {
  SIGN_UP = 'SIGN_UP',
  LOGIN = 'LOGIN',
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

export type AuthActionTypes = signUp | login;

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

    return dispatch({
      type: AuthActions.SIGN_UP,
      token: data.idToken,
      userId: data.localId,
    });
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

    return dispatch({
      type: AuthActions.LOGIN,
      token: data.idToken,
      userId: data.localId,
    });
  };
};
