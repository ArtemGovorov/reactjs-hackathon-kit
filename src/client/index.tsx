import '../shared/polyfill';
/* tslint:disable:no-unused-variable */
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import createRoutes from '../shared/routes';
import * as createBrowserHistory from 'history/lib/createBrowserHistory';
import { useRouterHistory, match } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import createStore from '../shared/store/createStore';

const MOUNT_ELEMENT = document.getElementById('root');

const browserHistory = useRouterHistory(createBrowserHistory as any)({
  basename: __BASENAME__
});

const store = createStore(window.__data, browserHistory);
let routes = createRoutes(store);
const history = syncHistoryWithStore(browserHistory, store, {
  // Sync router history with the redux router store
  selectLocationState: (state) => state.router,
});

// Render Setup
let render = (key = null) => {
  const Root = require('../shared/containers/Root').default;
  routes = require('../shared/routes/index').default(store);
  let App;
  if (__DEV__) {
    App = (
      <AppContainer>
        <Root routerKey={key} store={store} history={history} routes={routes} />
      </AppContainer>
    );
  } else {
    App = (
      <Root store={store} history={history} routes={routes} />
    );
  }
  ReactDOM.render(App, MOUNT_ELEMENT);
};

// Hot reloading setup
if (__DEV__ && module.hot) {
  const renderApp = render;
  const renderError = (error) => {
    const RedBox = require('redbox-react');
    ReactDOM.render(<RedBox error={error} />, MOUNT_ELEMENT);
  };
  render = () => {
    try {
      renderApp(Math.random());
    } catch (e) {
      renderError(e);
    }
  };
  module.hot.accept(['../shared/containers/Root', '../shared/routes/index.ts'], () => {
    render();
  });
}

//  Redux DevTools chrome extension
if (__DEVTOOLS__) {
  if (window.devToolsExtension) {
    window.devToolsExtension.open();
  }
}

match({ history, routes }, () => {
  render();
});

