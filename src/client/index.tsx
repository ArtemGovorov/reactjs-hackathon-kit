import '../polyfill';
global.Parse = require('parse');
Parse.initialize('myAppId', '');
Parse.serverURL = 'http://localhost:3000/parse';
import * as ReactDOM from 'react-dom';
import * as React from 'react';
import {render} from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import routes from '../shared/routes/index.tsx';
import {  match, Router, browserHistory } from 'react-router';
import configureStore from '../shared/store/configureStore';
import { Provider } from 'react-redux';
import WithStylesContext from '../shared/components/WithStylesContext';

// Get the DOM Element that will host our React application.
const MOUNT_ELEMENT = document.getElementById('root');
const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState, browserHistory);
//const routes = createRoutes(store);
function routerError(error?: string) {
  // TODO: Error handling.
  console.error('==> 😭  React router match failed.'); // eslint-disable-line no-console
  const RedBox = require('redbox-react').default;
  ReactDOM.render(<RedBox error={error} />, MOUNT_ELEMENT);
}


function renderApp() {

  // As we are using dynamic react-router routes we have to use the following
  // asynchronous routing mechanism supported by the `match` function.
  // @see https://github.com/reactjs/react-router/blob/master/docs/guides/ServerRendering.md
  (match as any)({ history: browserHistory, routes }, (error, redirectLocation, renderProps) => {
    if (error) {
      routerError(error);
    } else if (redirectLocation) {
      return;
    } else if (renderProps) {

      render(

        <AppContainer>
          <Provider store={store}>
           <WithStylesContext onInsertCss={styles =>
             styles._insertCss()
            }>
            <Router {...renderProps} />
            </WithStylesContext>
          </Provider>
        </AppContainer>
,
        MOUNT_ELEMENT
      );


    } else {
      routerError();
    }
  });

  // remove server-generated css
  setTimeout(function () {
    if (document.getElementById('fast-css')) {
      document.getElementById('fast-css').remove();
    }
  }, 500);


}

// The following is needed so that we can hot reload our App.
if (__DEVCLIENT__ && module.hot) {
  // Accept changes to this file for hot reloading.
  (module.hot as any).accept('./index.tsx');
  // Any changes to our routes will cause a hotload re-render.
  module.hot.accept([
    '../shared/routes/index.tsx'
  ], renderApp);


}

renderApp();