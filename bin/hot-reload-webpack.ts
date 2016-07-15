#!/usr/bin/env Node
import * as express from 'express';
import * as webpack from 'webpack';
import * as webpackDevConfig from './config/webpack.config.dev-client';
const compiler = webpack(webpackDevConfig);
const _debug = require('debug');
const debug = _debug('app:bin:hot-reload-webpack');
import {
  PUBLIC_PATH,
  PORT
} from './config/constants';

//const host = 'localhost';
const devOptions = {
  contentBase: 'http://' + 'localhost' + ':' + (PORT + 1),
  quiet: true,
  noInfo: true,
  hot: false,
  inline: false,
  overlay: true,
  lazy: false,
  publicPath: `http://localhost:${PORT + 1}${PUBLIC_PATH}`,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: {
    colors: false
  }
};

const hotOptions = {
  log: str => debug('\n  🔥  ' + str),
  overlay: true,
  quiet: false,
  noInfo: false
};



const app: express.Express = express();

app.use(require('webpack-dev-middleware')(compiler, devOptions));
app.use(require('webpack-hot-middleware')(compiler, hotOptions));

app.listen((PORT + 1), function onAppListening(err) {
  if (err) {
    debug(err);
  } else {
    debug(`\n  🔥  Hot Reloading: http://localhost:${(PORT + 1)}`);
  }
});

