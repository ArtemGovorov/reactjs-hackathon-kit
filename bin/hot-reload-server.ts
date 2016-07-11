#!/usr/bin/env Node
import * as express from 'express';
import * as webpack from 'webpack';
import * as webpackDevConfig from './config/webpack.config.dev-client';
const compiler = webpack(webpackDevConfig);
const _debug = require('debug');
const debug = _debug('app:webpack:webpack.server');
import {
  PUBLIC_PATH,
	PORT
} from './config/constants';

//const host = 'localhost';
const serverOptions = {
	contentBase: 'http://' + 'localhost' + ':' + (PORT + 1),
	quiet: true,
	noInfo: true,
	hot: false,
	inline: false,
	lazy: false,
	publicPath: `http://localhost:${PORT + 1}${PUBLIC_PATH}`,
	headers: { 'Access-Control-Allow-Origin': '*' },
	stats: {
		colors: false
	}
};

const app: express.Express = express();

app.use(require('webpack-dev-middleware')(compiler, serverOptions));
app.use(require('webpack-hot-middleware')(compiler));

app.listen((PORT + 1), function onAppListening(err) {
  if (err) {
    debug(err);
  } else {
		debug(`\n  🔥  Starting hot reload server at http://localhost:${(PORT + 1)}`);
  }
});

