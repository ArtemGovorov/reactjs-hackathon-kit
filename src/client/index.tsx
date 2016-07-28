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
import {findAsyncReducer}  from '../shared/utils/findAndReplaceReducerFromComponents';
import { Provider } from 'react-redux';
import findAndReplaceReducerFromComponents  from '../shared/utils/findAndReplaceReducerFromComponents';


// Get the DOM Element that will host our React application.
const MOUNT_ELEMENT = document.getElementById('root');
const initialState = window.__INITIAL_STATE__;
const store = configureStore(initialState, browserHistory);
console.log('change client state');
//const routes = createRoutes(store);
function routerError(error?: string) {
  // TODO: Error handling.
  console.error('==> 😭  React router match failed.'); // eslint-disable-line no-console
  if (error) { console.error(error); } // eslint-disable-line no-console
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
    
      //findAndReplaceReducerFromComponents(renderProps.components, store);
      render(
        <AppContainer>
          <Provider store={store}>
            <Router   {...renderProps} />
          </Provider>
        </AppContainer>,
        MOUNT_ELEMENT
      );

      console.log((module.hot as any).status());

    } else {
      routerError();
    }
  });
}

// The following is needed so that we can hot reload our App.
if (__DEVCLIENT__ && module.hot) {

  (module.hot as any).addStatusHandler(function (status) {
    console.log(status);
    /*      if (status === "idle") {
            const {appStore} = require('./appStore');
            store.replaceReducer(appStore); // reload reducers*/
  });
  // Accept changes to this file for hot reloading.
  (module.hot as any).accept('./index.tsx');
  // Any changes to our routes will cause a hotload re-render.
  module.hot.accept([
    '../shared/routes/index.tsx',
    '../shared/routes/Counter/containers/CounterContainer',
    '../shared/routes/Home/containers/HomeContainer'
  ], () => {
    console.log('updating shit');
    renderApp();

  });


}



renderApp();