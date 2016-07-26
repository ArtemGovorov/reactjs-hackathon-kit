import '../polyfill';
global.Parse = require('parse');
Parse.initialize('myAppId', '');
Parse.serverURL = 'http://localhost:3000/parse';
import * as React from 'react';
import {render} from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import createRoutes from '../shared/routes';
import * as createBrowserHistory from 'history/lib/createBrowserHistory';
import * as browserHistory from 'react-router/lib/browserHistory';
import { useRouterHistory, match, Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from '../shared/store/configureStore';
import Root from '../shared/containers/Root';

import { Provider } from 'react-redux';


// Get the DOM Element that will host our React application.
const MOUNT_ELEMENT = document.getElementById('root');
const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState, browserHistory);
const routes = createRoutes(store);
function routerError(error?: string) {
  // TODO: Error handling.
  console.error('==> 😭  React Router match failed.'); // eslint-disable-line no-console
  if (error) { console.error(error); } // eslint-disable-line no-console
}

function renderApp() {
  // As we are using dynamic react-router routes we have to use the following
  // asynchronous routing mechanism supported by the `match` function.
  // @see https://github.com/reactjs/react-router/blob/master/docs/guides/ServerRendering.md
  (match as any)({ history: browserHistory, routes: routes }, (error, redirectLocation, renderProps) => {
    if (error) {
      routerError(error);
    } else if (redirectLocation) {
      return;
    } else if (renderProps) {
      render(
        <AppContainer>
          {/*
          We need to explicly render the Router component here instead of have
          this embedded within a shared App type of component as we use different
          router base components for client vs server rendering.
          */}
          <Provider store={store}>
            <Router {...renderProps} />
          </Provider>
        </AppContainer>,
        MOUNT_ELEMENT
      );
    } else {
      routerError();
    }
  });
}

// The following is needed so that we can hot reload our App.
if (__DEVCLIENT__ && module.hot) {
  // Accept changes to this file for hot reloading.
  (module.hot as any).accept();
  // Any changes to our routes will cause a hotload re-render.
  module.hot.accept('../shared/routes', renderApp);
}

renderApp();