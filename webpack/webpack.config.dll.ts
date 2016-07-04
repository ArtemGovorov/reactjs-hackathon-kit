import * as webpack from 'webpack';
import {
  LOADERS_COMMON,
  SRC_DIR,
  ASSETS_DIR,
  PUBLIC_PATH,
  LOADERS_STYLES_DEV,
  PROJECT_ROOT,
  PORT
} from './webpack.constants';


import { join}  from 'path';

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
    library: '[name]',
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