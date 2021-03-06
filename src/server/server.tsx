import * as React from 'react';
import { match, RouterContext } from 'react-router';
import { renderToString } from 'react-dom/server';
import routes from '../shared/routes/index.tsx';
import header from '../shared/components/Meta/index.ts';
import configureStore from '../shared/store/configureStore';

const createHistory = require('react-router/lib/createMemoryHistory');
import { syncHistoryWithStore } from 'react-router-redux';
import { Provider } from 'react-redux';
import WithStylesContext from '../shared/components/WithStylesContext';
import findAndReplaceReducerFromComponents from '../shared/utils/findAndReplaceReducerFromComponents';
require('source-map-support').install();
const PORT = 3000;
const fs = require('fs');

let javascript = {};
let vendor = '';
if (__DEVSERVER__) {
  javascript = `http://localhost:${PORT + 1}/assets/main.js`;
  vendor = '<script type="text/javascript" charset="utf-8" src="assets/vendor.dll.js"></script>';
} else {
  const assets = JSON.parse(fs.readFileSync('webpack-assets.json'));
  javascript = assets.main.js;
}

/**
 * An express middleware that is capabable of doing React server side rendering.
 */
function universalReactAppMiddleware(request, response) {
  /*  if (process.env.DISABLE_SSR) {
      if (process.env.NODE_ENV === 'development') {
        console.log('==> 🐌  Handling react route without SSR');  // eslint-disable-line no-console
      }
      // SSR is disabled so we will just return an empty html page and will
      // rely on the client to populate the initial react application state.
      const html = render();
      response.status(200).send(html);
      return;
    }*/

  const authenticated = true; //TODO Check Parse sesson req.isAuthenticated();
  const history = createHistory(request.originalUrl);

  const store = configureStore({
    user: {
      authenticated,
      isWaiting: false,
      message: '',
      isLogin: true
    }
  }, history);

  syncHistoryWithStore(history, store, {
    selectLocationState: (state) => state.router,
  });

  //const routes = createRoutes(store);


  // Server side handling of react-router.
  // Read more about this here:
  // https://github.com/reactjs/react-router/blob/master/docs/guides/ServerRendering.md
  match({ routes, history }, (error, redirectLocation, renderProps) => {
    if (error) {
      response.status(500).send(error.message);
    } else if (redirectLocation) {
      response.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      // You can check renderProps.components or renderProps.routes for
      // your "not found" component or route respectively, and send a 404 as
      // below, if you're using a catch-all route.
      findAndReplaceReducerFromComponents(renderProps.components, store);
      let css = []; // CSS for all rendered React components
      const initialState = store.getState();
      const componentHTML = renderToString(
        <Provider store={store}>
          <WithStylesContext onInsertCss={
            styles =>
              css.push(styles ? styles._getCss() : '')
          }>
            <RouterContext {...renderProps as any} />
          </WithStylesContext>
        </Provider>
      );

      response.status(200).send(`
          <!doctype html>
          <html ${header['htmlAttributes'].toString()}>
            <head>
              ${header.title.toString()}
              ${header.meta.toString()}
              ${header.link.toString()}
              <style type="text/css" id="fast-css">${css.join('')}</style>
            </head>
            <body>
              <div id="root">${componentHTML}</div>
              <script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};</script>

              ${vendor}
              <script type="text/javascript" charset="utf-8" src="${javascript}"></script>
            </body>
          </html>
                  `);

    } else {
      response.status(404).send('Not found');
    }
  });
}

export default universalReactAppMiddleware;