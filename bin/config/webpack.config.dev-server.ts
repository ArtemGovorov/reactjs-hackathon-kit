import * as webpack from 'webpack';
import {Configuration} from 'webpack';
const ExtractTextPlugin = require('extract-text-webpack-plugin');

import {
  LOADERS_COMMON,
  SRC_DIR,
  ASSETS_DIR,
  BASENAME,
  PUBLIC_PATH,
  LOADERS_STYLES_PROD,
  EXTERNALS,
  PROJECT_ROOT
} from './constants';

const webpackConfig: Configuration = {
  cache: false,
  context: PROJECT_ROOT,
  entry: {
    server: [
      'bootstrap-loader/extractStyles',
      `${SRC_DIR}/server`,
    ]
  },
  target: 'node',
  output: {
    path: ASSETS_DIR,
    filename: 'server.js',
    publicPath: PUBLIC_PATH,
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: LOADERS_COMMON
      .concat(
      LOADERS_STYLES_PROD
      )
  },
  resolve: {
    root: [SRC_DIR],
    extensions: ['', '.ts', '.tsx', '.js', '.css'],
  },
  devtool: 'eval',
  plugins: [

    new ExtractTextPlugin('styles/main.css', {
      allChunks: true
    }),
    new (webpack as any).BannerPlugin(
      {
        banner: 'require("source-map-support").install();',
        raw: true,
        entryOnly: false
      }),
    new webpack.DefinePlugin({
      __CLIENT__: false,
      __DEVCLIENT__: false,
      __DEVSERVER__: true,
      __BASENAME__: BASENAME,
      __DEVTOOLS__: false
    })
  ]
};

// The configuration for the server-side rendering
webpackConfig['name'] = 'dev-server';
webpackConfig['externals'] = EXTERNALS as any;


export = webpackConfig;