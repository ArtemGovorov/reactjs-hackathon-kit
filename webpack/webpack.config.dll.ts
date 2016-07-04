import * as webpack from 'webpack';
import {Configuration} from 'webpack';
import {
  LOADERS_COMMON,
  SRC_DIR,
  HOT_MIDDLEWARE,
  ASSETS_DIR,
  DEVTOOLS,
  BASENAME,
  PUBLIC_PATH,
  LOADERS_STYLES_DEV,
  NODE_MODULES,
  PROJECT_ROOT,
  PORT
} from './webpack.constants';
// Webpack config for development

import {resolve, join}  from 'path';
const host = (process.env.HOST || 'localhost');


const WebpackNotifierPlugin = require('webpack-notifier');

module.exports = {
  devtool: 'inline-source-map',
  context: PROJECT_ROOT,
  entry: {
    app_assets: [`${SRC_DIR}/client`],
    vendor: [
      'react',
      'react-dom',
      'react-dom/server',
      'react-hot-loader',
      'redux',
      'history/lib/createBrowserHistory',
      'react-router',
      'react-helmet',
      'react-proxy',
      'react-router',
      'history',
      '@reactivex/rxjs',
      'react-router-redux',
      'parse',
      'redux-observable',
      'classnames'
    ]
  },
  output: {
    path: ASSETS_DIR,
    filename: '[name].dll.js',
    library: '[name]', // added?
    publicPath: `http://localhost:${PORT}${PUBLIC_PATH}`,
  },
  module: {
    loaders: LOADERS_COMMON
      .concat(LOADERS_STYLES_DEV)
  },
  progress: true,
  resolve: {
    modulesDirectories: [
      'src',
      'assets',
      'node_modules'
    ],
    extensions: ['', '.json', '.js', '.jsx']
  },
  plugins: [
    new webpack['DllPlugin']({
      name: '[name]',
      path: join(ASSETS_DIR, '[name]-manifest.json'),
    }),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    new webpack.DefinePlugin({
      // This speeds up some local libraries for me, you may not want it
      'process.env': {
        NODE_ENV: '"production"'
      },
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: false  // <-------- DISABLE redux-devtools HERE
    }),
    new WebpackNotifierPlugin(),
  ]
};