import { IAuthState } from '../states/auth';
import { AuthActionTypes, AuthActions } from '../actions/auth';

const initialState: IAuthState = {
  token: '',
  userId: '',
  didTryAutoLogin: false,
};

export default (state: IAuthState = initialState, action: AuthActionTypes) => {
  switch (action.type) {
    case AuthActions.AUTHENTICATE:
    case AuthActions.SIGN_UP:
    case AuthActions.LOGIN:
      return {
        ...state,
        token: action.token,
        userId: action.userId,
        didTryAutoLogin: true,
      };

    case AuthActions.SET_DID_TRY_AL:
      return {
        ...state,
        didTryAutoLogin: true,
      };

    case AuthActions.LOGOUT:
      return initialState;

    default:
      return state;
  }
};
