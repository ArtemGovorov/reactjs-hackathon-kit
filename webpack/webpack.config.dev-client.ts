import * as webpack from 'webpack';
import {Configuration} from 'webpack';
import {
  LOADERS_COMMON,
  POST_CSS_CONFIG_DEV,
  SRC_DIR,
  HOT_MIDDLEWARE,
  ASSETS_DIR,
  DEVTOOLS,
  BASENAME,
  PUBLIC_PATH,
  FILE_NAME,
  LOADERS_STYLES_DEV
} from './webpack.constants';
const AssetsPlugin = require('assets-webpack-plugin');
const assetsPluginInstance = new AssetsPlugin();
const webpackConfig: Configuration = {
  devtool: 'eval',
  context: SRC_DIR,
  entry: {
    'main': [
      HOT_MIDDLEWARE,
      'react-hot-loader/patch',
      `bootstrap-sass!${SRC_DIR}/theme/bootstrap.config.js`,
      `font-awesome-webpack!${SRC_DIR}/theme/font-awesome.config.js`,
      `${SRC_DIR}/client`
    ]
  },
  output: {
    path: ASSETS_DIR,
    filename: FILE_NAME,
    publicPath: PUBLIC_PATH
  },
  module: {
    loaders: LOADERS_COMMON
      .concat(LOADERS_STYLES_DEV)
  },
  resolve: {
    root: [SRC_DIR],
    extensions: ['', '.ts', '.tsx', '.js'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __DEVCLIENT__: true,
      __DEVSERVER__: false,
      __BASENAME__: BASENAME,
      __DEVTOOLS__: DEVTOOLS
    }),
    assetsPluginInstance
  ]

};

// The configuration for the client
webpackConfig['name'] = 'browser';
webpackConfig['postcss'] = POST_CSS_CONFIG_DEV;
export = webpackConfig;
