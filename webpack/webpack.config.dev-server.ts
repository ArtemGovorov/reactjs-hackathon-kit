import * as webpack from 'webpack';
import {Configuration} from 'webpack';
const CleanPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
import {
  LOADERS_COMMON,
  SRC_DIR,
  ASSETS_DIR,
  BASENAME,
  PUBLIC_PATH,
  BUILD_DIR,
  LOADERS_STYLES_PROD,
  PROJECT_ROOT,
  EXTERNALS
} from './webpack.constants';


const webpackConfig: Configuration = {
  context: SRC_DIR,
  entry: {
    server: [
      `bootstrap-sass!${SRC_DIR}/theme/bootstrap.config.prod.js`,
      `font-awesome-webpack!${SRC_DIR}/theme/font-awesome.config.prod.js`,
      `${SRC_DIR}/server`
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
      .concat(LOADERS_STYLES_PROD)
  },
  resolve: {
    root: [SRC_DIR],
    extensions: ['', '.js'],
  },
  devtool: 'sourcemap',
  plugins: [
    new CleanPlugin([BUILD_DIR], { root: PROJECT_ROOT }),
    new ExtractTextPlugin('styles/main.css', {
      allChunks: true
    }),
    new webpack.BannerPlugin('require("source-map-support").install();',
      { raw: true, entryOnly: false }),
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
webpackConfig['name'] = 'server-side rendering';
webpackConfig['externals'] = EXTERNALS as any;
export = webpackConfig;