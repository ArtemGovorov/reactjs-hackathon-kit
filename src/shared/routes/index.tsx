import * as React from 'react';
import {Route, IndexRoute} from 'react-router';
import { injectReducer } from '../store/reducers';
import { CoreLayout } from '../layouts/CoreLayout/CoreLayout';

function handleError(err) {
  // TODO: Error handling, do we return an Error component here?
  console.log('==> Error occurred loading dynamic route'); // eslint-disable-line no-console
  console.log(err); // eslint-disable-line no-console
}

function resolveIndexComponent(store) {
  return (nextState, cb) =>
    System.import('./Home/containers/HomeContainer')
      .then(module => cb(null, module.default))
      .catch(handleError);
}

function resolveCounterComponent(store) {
  return (nextState, cb) =>
    System.import('./Counter/modules/counter')
      .then(module => {
        injectReducer(store, { key: 'counter', reducer: module.default });
        return System.import('./Counter/containers/CounterContainer');
      })
      .then(module => cb(null, module.default))
      .catch(handleError);
}

/**
 * Our routes.
 *
 * NOTE: We load our routes asynhronously using the `getComponent` API of
 * react-router, doing so combined with the `System.import` support by
 * webpack 2 allows us to get code splitting based on our routes.
 * @see https://github.com/reactjs/react-router/blob/master/docs/guides/DynamicRouting.md
 * @see https://gist.github.com/sokra/27b24881210b56bbaff7#code-splitting-with-es6
 */
const routes = (store) => (
  <Route path = '/' component = { CoreLayout } >
    <IndexRoute getComponent= {resolveIndexComponent(store) } />
    <Route path='counter' getComponent={resolveCounterComponent(store) }/ >
  </Route>
);

export default routes;