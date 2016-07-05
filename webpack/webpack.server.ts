#!/usr/bin/env Node
import * as express from 'express';
import * as webpack from 'webpack';
import * as webpackDevConfig from '../webpack/webpack.config.dev-client';
const compiler = webpack(webpackDevConfig);
import {
  PUBLIC_PATH,
	PORT
} from './webpack.constants';

//const host = 'localhost';
const serverOptions = {
	contentBase: 'http://' + 'localhost' + ':' + (PORT + 1),
	quiet: false, // don’t output anything to the console
	noInfo: true, // suppress boring information
	hot: false, // adds the HotModuleReplacementPlugin
  //and switch the server to hot mode. Note: make sure you don’t add HotModuleReplacementPlugin twice
	inline: true, // also adds the webpack/hot/dev-server entry

	// You can use it in two modes:
	// watch mode (default): The compiler recompiles on file change.
	// lazy mode: The compiler compiles on every request to the entry point.
	lazy: false,

	// network path for static files: fetch all statics from webpack development server
	 publicPath: `http://localhost:${PORT + 1}${PUBLIC_PATH}`,

	headers: { 'Access-Control-Allow-Origin': '*' },
	stats: { colors: true }
};

const app: express.Express = express();

app.use(require('webpack-dev-middleware')(compiler, serverOptions));
app.use(require('webpack-hot-middleware')(compiler));

app.listen((PORT + 1), function onAppListening(err) {
  if (err) {
    console.error(err);
  } else {
    console.info('==> 🚧  Webpack development server listening on port %s', (PORT + 1));
  }
});

