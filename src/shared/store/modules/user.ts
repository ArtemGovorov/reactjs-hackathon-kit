import {Observable} from 'rxjs/Observable';


import { push } from 'react-router-redux';

export const LOGIN_FULFILLED = 'LOGIN_FULFILLED ';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_ABORTED = 'LOGIN_ABORTED';
export const TOGGLE = 'TOGGLE';

export const TOGGLE_LOGIN_MODE = 'TOGGLE_LOGIN_MODE';

export const cancelLogin = () => ({
  type: LOGIN_ABORTED
});

export const toggle = () => ({
  type: TOGGLE
});


export const completeLogIn = (user) =>
  (actions, store) =>
    Observable
      .of({ type: LOGIN_FULFILLED, payload: user })
      .concat(Observable.of(push('/')));

export const login = (
  username: string,
  password: string
) => (
    (actions, store) => Observable
      .defer(
      () =>
        Observable
          .fromPromise(
          Parse.Cloud.run('logIn', {
            username: username,
            password: password
          }) as any
          )
      )
      .delay(1000)
      .takeUntil(actions.ofType(LOGIN_ABORTED))
      .map(payload => completeLogIn(payload))
      .catch(error => Observable.of({ type: 'LOGIN_ERROR', error }))
      .startWith({ type: LOGIN_PENDING } as any)
  );

const initialState = {
  isLogin: true,
  message: '',
  isWaiting: false,
  authenticated: false,
  username: 'waiting'
};

export default function userReducer(
  state = initialState,
  action: any = {}) {
  switch (action.type) {
    case TOGGLE_LOGIN_MODE:
      return Object.assign({}, state, {
        isLogin: !state.isLogin,
        message: ''
      });
    case LOGIN_FULFILLED:
      const user = action.payload as Parse.User;
      return Object.assign({}, state, {
        isWaiting: false,
        authenticated: true,
        message: '',
        username: user.getUsername()
      });
    case LOGIN_ERROR:
      return Object.assign({}, state, {
        isWaiting: false,
        authenticated: false,
        message: action.message
      });
    case LOGIN_ABORTED:
      return Object.assign({}, state, {
        isWaiting: false,
      });
    case LOGIN_PENDING:
      return Object.assign({}, state, {
        isWaiting: true,
      });
    case TOGGLE:
      return Object.assign({}, state, {
        isWaiting: !state.isWaiting,
      });
    /*case SIGNUP_USER:
      return Object.assign({}, state, {
        isWaiting: true,
        message: ''
      });
    case SIGNUP_SUCCESS_USER:
      return Object.assign({}, state, {
        isWaiting: false,
        authenticated: true
      });
    case SIGNUP_ERROR_USER:
      return Object.assign({}, state, {
        isWaiting: false,
        authenticated: false,
        message: action.message
      });
    case LOGOUT_USER:
      return Object.assign({}, state, {
        isWaiting: true,
        message: ''
      });
    case LOGOUT_SUCCESS_USER:
      return Object.assign({}, state, {
        isWaiting: false,
        authenticated: false
      });
    case LOGOUT_ERROR_USER:
      return Object.assign({}, state, {
        isWaiting: false,
        authenticated: true,
        isLogin: true
      });*/
    default:
      return state;
  }
}
