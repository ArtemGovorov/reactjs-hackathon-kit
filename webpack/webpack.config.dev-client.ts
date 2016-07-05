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
  PORT,
  PROJECT_ROOT,
  POST_CSS_CONFIG_DEV
} from './webpack.constants';
const WebpackNotifierPlugin = require('webpack-notifier');
import {join} from 'path';
const webpackConfig: Configuration = {
  devtool: 'eval',
  context: PROJECT_ROOT,
  entry: {
    'main': [
      'react-hot-loader/patch',
      HOT_MIDDLEWARE,
      './node_modules/bootstrap/dist/css/bootstrap.css',
      `${SRC_DIR}/client`
    ]
  },
  output: {
    path: ASSETS_DIR,
    filename: '[name].js',
    publicPath: `http://localhost:${PORT + 1}${PUBLIC_PATH}`,
  },
  module: {
    loaders: LOADERS_COMMON
      .concat(LOADERS_STYLES_DEV)
  },
  resolve: {
    root: [SRC_DIR],
    extensions: ['', '.ts', '.tsx', '.js'],

  },
  resolveLoader: {
    modulesDirectories: [NODE_MODULES]
  },
  plugins: [
    new webpack['DllReferencePlugin']({
      context: PROJECT_ROOT,
      manifest: require(ASSETS_DIR + 'vendor-manifest.json'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      },

      __CLIENT__: true,
      __DEVCLIENT__: true,
      __DEVSERVER__: false,
      __BASENAME__: BASENAME,
      __DEVTOOLS__: DEVTOOLS
    }),
    new WebpackNotifierPlugin()
  ]

};

// The configuration for the client
webpackConfig['name'] = 'browser';
webpackConfig['progress'] = 'true';
webpackConfig['postcss'] = POST_CSS_CONFIG_DEV;
export = webpackConfig;
