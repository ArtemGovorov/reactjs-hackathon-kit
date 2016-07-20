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
  POST_CSS_CONFIG_DEV,
  PLUG_IN_PROGRESS
} from './constants';

const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;

const webpackConfig: Configuration = {

  devtool: 'eval',
  context: PROJECT_ROOT,
  entry: {
    'main': [
      'react-hot-loader/patch',
      HOT_MIDDLEWARE,
      'webpack/hot/only-dev-server',
      //'bootstrap-loader',
      `${SRC_DIR}/client`,
    ]
  },
  output: {
    path: ASSETS_DIR,
    filename: '[name].js',
    publicPath: `http://localhost:${PORT + 1}${PUBLIC_PATH}`,
  },
  module: {
    loaders: LOADERS_COMMON
      .concat(
      LOADERS_STYLES_DEV
      )
  },
  resolve: {
    root: [SRC_DIR],
    extensions: ['', '.ts', '.tsx', '.js', '.scss', '.css'],

  },
  resolveLoader: {
    modulesDirectories: [NODE_MODULES]
  },
  plugins: [
    PLUG_IN_PROGRESS,
    new webpack.HotModuleReplacementPlugin(),
    /*    new webpack['DllReferencePlugin']({
          context: PROJECT_ROOT,
          manifest: require(ASSETS_DIR + '/vendor-manifest.json'),
        }),*/
    new webpack.NoErrorsPlugin(),
    new ForkCheckerPlugin(),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __DEVCLIENT__: true,
      __DEVSERVER__: false,
      __BASENAME__: BASENAME,
      __DEVTOOLS__: DEVTOOLS
    }),

  ]

};

// The configuration for the client
webpackConfig['name'] = 'client';
webpackConfig['postcss'] = POST_CSS_CONFIG_DEV;
export = webpackConfig;
