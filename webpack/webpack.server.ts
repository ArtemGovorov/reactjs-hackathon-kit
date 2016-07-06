#!/usr/bin/env Node
import * as express from 'express';
import * as webpack from 'webpack';
import * as webpackDevConfig from '../webpack/webpack.config.dev-client';
const compiler = webpack(webpackDevConfig);
const _debug = require('debug');
const debug = _debug('app:webpack:webpack.server');
import {
  PUBLIC_PATH,
	PORT
} from './webpack.constants';

//const host = 'localhost';
const serverOptions = {
	contentBase: 'http://' + 'localhost' + ':' + (PORT + 1),
	quiet: false,
	noInfo: false,
	hot: false,
	inline: false,
	lazy: false,
	publicPath: `http://localhost:${PORT + 1}${PUBLIC_PATH}`,
	headers: { 'Access-Control-Allow-Origin': '*' },
	stats: {
		chunks: true,
		chunkModules: false,
		colors: true,
		hash: true,
		version: true,
		timings: true
	}
};

const app: express.Express = express();

app.use(require('webpack-dev-middleware')(compiler, serverOptions));
app.use(require('webpack-hot-middleware')(compiler));

app.listen((PORT + 1), function onAppListening(err) {
  if (err) {
    debug(err);
  } else {
		debug(`🖥  🔥  Starting hot reload server at localhost:${(PORT + 1)}`);
  }
});

