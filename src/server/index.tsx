import '../shared/polyfill';
/* tslint:disable:no-unused-variable */
import * as React from 'react';
import * as  ReactDOM from 'react-dom/server';
import {renderToString} from 'react-dom/server';
import {match, RouterContext} from 'react-router';
import routes from '../shared/routes';
import Html from './Html';
import './favicon.ico';
import { syncHistoryWithStore } from 'react-router-redux';
import createHistory from 'react-router/lib/createMemoryHistory';
import { Provider } from 'react-redux';
import createStore from '../shared/store/createStore';
import makeRoutes from '../shared/routes';

const store = {};



export default function (req: any, res: any, assets: any) {

	console.log(req.url);

	const initialState = { global: { loading: true } };
  const memoryHistory = createHistory(req.originalUrl);
  const store = createStore(initialState, memoryHistory);
  const routes = makeRoutes(store);
  const history = syncHistoryWithStore(memoryHistory, store, {
    selectLocationState: (state) => state.router,
  });

	function hydrateOnClient() {
    res.send(`<!doctype html>\n${
			ReactDOM.renderToString(
				<Html assets={assets} store={store as any} component={null}/>
			)
			}`);
  }

	match({ history, routes, location: req.url } as any, (error, redirectLocation, renderProps) => {
		if (redirectLocation) {
			res.redirect(redirectLocation.pathname + redirectLocation.search);
		} else if (error) {
			console.error('ROUTER ERROR:', error);
			res.status(500);
			hydrateOnClient();
		} else if (renderProps) {
			const component = (
				<Provider store={store as any}>
					<div style={{ height: '100%' }}>
						<RouterContext children={routes} {...renderProps as any} />
					</div>
				</Provider>
			);

			res.status(200);

			global['navigator'] = { userAgent: req.headers['user-agent'] };


			res.send(`<!doctype html>\n${ReactDOM.renderToString(
				<Html assets={assets} component={component} store={store} />)}`);
		}
	});
}
