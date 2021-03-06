import { applyMiddleware, compose, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { reduxObservable } from 'redux-observable';
import reducers from './reducers';

export default (initialState = {}, history) => {

  const middleware: any = [reduxObservable(), routerMiddleware(history)];

  const enhancers = [];
  if (__DEVTOOLS__) {
    const devToolsExtension = window.devToolsExtension;
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension());
    }
  }

  const store: any = createStore(
    reducers(),
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );
  store.asyncReducers = {};


  return store;
};
