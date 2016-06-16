import '../shared/polyfill';
/* tslint:disable:no-unused-variable */
import * as React from 'react';
import * as  ReactDOM from 'react-dom/server';
import {renderToString} from 'react-dom/server';
import {match, RouterContext} from 'react-router';
import routes from '../shared/routes';
import Html from './Html';
//import './favicon.ico';

const store = {};



export default function (req: any, res: any, assets: any) {

	console.log(req.url);

	function renderHTML(component: any) {
    return `<!doctype html>\n${
			ReactDOM.renderToString(
				<Html
					assets={ assets }
					component={component}
					store={store} />)}`;
	}

	match({ routes, location: req.url }, (error: any, redirectLocation: any, renderProps: any) => {
    if (error) {
			res.status(500).send(error.message);
    } else if (redirectLocation) {
			res.redirect(302, redirectLocation.pathname + redirectLocation.search);
    } else if (renderProps) {
			res.status(200).send(renderHTML(renderToString(<RouterContext {...renderProps} />)));
    } else {
			res.status(404).send('Not found');
    }
	});

};

