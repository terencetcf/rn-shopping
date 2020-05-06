import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';

import apiHelper from '../../helpers/api-helper';

export enum AuthActions {
  SIGN_UP = 'SIGN_UP',
  LOGIN = 'LOGIN',
}

interface signUp {
  type: typeof AuthActions.SIGN_UP;
}
interface login {
  type: typeof AuthActions.LOGIN;
}

export type AuthActionTypes = signUp | login;

export const signUp = (email: string, password: string) => {
  return async (dispatch: ThunkDispatch<{}, {}, AnyAction>) => {
    const data = await apiHelper.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBJR-Nyya179ioUIGiT2zzi0tFSwU215IE`,
      {
        email,
        password,
        returnSecurityToken: true,
      }
    );

    console.log(data, 'sign up');

    return dispatch({
      type: AuthActions.SIGN_UP,
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
        returnSecurityToken: true,
      }
    );

    console.log(data, 'login');

    return dispatch({
      type: AuthActions.LOGIN,
    });
  };
};
