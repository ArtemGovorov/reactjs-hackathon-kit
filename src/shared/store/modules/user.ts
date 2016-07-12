import {Observable}  from '@reactivex/rxjs';
import { push } from 'react-router-redux';

export const LOGIN_FULFILLED = 'LOGIN_FULFILLED ';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_PENDING = 'LOGIN_PENDING';
export const LOGIN_ABORTED = 'LOGIN_ABORTED';

export const TOGGLE_LOGIN_MODE = 'TOGGLE_LOGIN_MODE';

export const cancelLogin = () => ({
  type: LOGIN_ABORTED
});

export const logIn = (user) =>
  (actions, store) =>
    Observable
      .of({ type: LOGIN_FULFILLED, payload: user })
      .concat(Observable.of(push('/')))
      .do(x => { console.log(x); });

export const attemptLogin = (
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
      .delay(3000)
      .takeUntil(actions.ofType(LOGIN_ABORTED))
      .map(payload => logIn(payload))
      .catch(error => Observable.of({ type: 'LOGIN_ERROR', error }))
      .startWith({ type: LOGIN_PENDING } as any)
      .do(x => { console.log(x); })
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
    case LOGIN_PENDING:
      return Object.assign({}, state, {
        isWaiting: true,
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
