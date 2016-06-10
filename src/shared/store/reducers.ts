import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import global from './modules/global';

export const reducers = (asyncReducers?: any) =>
  combineReducers(
    Object.assign(
      {},
      {
        router,
        global
      },
      {
        asyncReducers
      }
    )
  );

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer;
  store.replaceReducer(reducers(store.asyncReducers));
};

export default reducers;
