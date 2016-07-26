/* tslint:disable:no-unused-variable */
import * as axios from 'axios';
/* tslint:enable:no-unused-variable */
import * as React from 'react';
import { renderToString } from 'react-dom/server';
import { syncHistoryWithStore } from 'react-router-redux';
import {  match, RouterContext } from 'react-router';
const createHistory = require('react-router/lib/createMemoryHistory');
import { Provider } from 'react-redux';
import createRoutes from '../shared/routes';
import configureStore from '../shared/store/configureStore';

import loadStylesFromComponents from './utils/loadStylesFromComponents';
//import preRenderMiddleware from 'middlewares/preRenderMiddleware';
import header from '../shared/components/Meta';
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


/*const clientConfig = {
  host: process.env.HOSTNAME || 'localhost',
  port: process.env.PORT || '3000'
};
*/
// configure baseURL for axios requests (for serverside API calls)
//axios.defaults.baseURL = `http://${clientConfig.host}:${clientConfig.port}`;

const analtyicsScript = '';
/* typeof trackingID === "undefined" ? ``
	 :
	 `<script>
	 (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	 (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	 m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	 })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
	 ga('create', ${trackingID}, 'auto');
	 ga('send', 'pageview');
 </script>`;*/

/*
 * To Enable Google analytics simply replace the hashes with your tracking ID
 * and move the constant to above the analtyicsScript constant.
 *
 * Currently because the ID is declared beneath where is is being used, the
 * declaration will get hoisted to the top of the file.
 * however the assignement  does not, so it is undefined for the type check above.
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var#var_hoisting
 */
//const trackingID = "'UA-########-#'";

/*
 * Export render function to be used in server/config/routes.js
 * We grab the state passed in from the server and the req object from Express/Koa
 * and pass it into the Router.run function.
 */
export default function render(req, res) {
  const authenticated = true; //TODO Check Parse sesson req.isAuthenticated();
  const memoryHistory = createHistory(req.originalUrl);

  const store = configureStore({
    user: {
      authenticated,
      isWaiting: false,
      message: '',
      isLogin: true
    }
  }, memoryHistory);

  syncHistoryWithStore(memoryHistory, store, {
    selectLocationState: (state) => state.router,
  });

  const routes = createRoutes(store);

  console.log(routes);


  match({ routes, location: req.url }, (error, redirectLocation, renderProps) => {
    if (error) {
      res.status(500).json(error);
    } else if (redirectLocation) {
      res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
      const initialState = store.getState();
      const componentHTML = renderToString(
        <Provider store={store}>
          <div style={{ height: '100%' }}>
            <RouterContext {...renderProps as any} />
          </div>
        </Provider>
      );

      const styles = loadStylesFromComponents(renderProps.components);

      const render = function () {
        res.status(200).send(`
          <!doctype html>
          <html ${header['htmlAttributes'].toString()}>
            <head>
              ${header.title.toString()}
              ${header.meta.toString()}
              ${header.link.toString()}
              <style type="text/css" id="fast-css">${styles}</style>
            </head>
            <body>
              <div id="root">${componentHTML}</div>
              <script>window.__INITIAL_STATE__ = ${JSON.stringify(initialState)};</script>
              ${analtyicsScript}
              ${vendor}
              <script type="text/javascript" charset="utf-8" src="${javascript}"></script>
            </body>
          </html>
        `);
      };

      render();

    } else {
      res.sendStatus(404);
    }
  });
}
