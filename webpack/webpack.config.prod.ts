import * as webpack from 'webpack';
import {Configuration} from 'webpack';
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const InlineEnviromentconstiablesPlugin = require('inline-environment-variables-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const assetsPluginInstance = new AssetsPlugin();

import {
  SRC_DIR,
  ASSETS_DIR,
  BASENAME,
  PUBLIC_PATH,
  BUILD_DIR,
  LOADERS_STYLES_PROD,
  PROJECT_ROOT,
  LOADERS_COMMON,
  FILE_NAME,
  POST_CSS_CONFIG_PROD,
} from './webpack.constants';


const webpackConfig: Configuration = [
  {
    // The configuration for the client
    name: 'browser',
    devtool: 'source-map',
    context: SRC_DIR,
    entry: {
      'main': [
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
        .concat(LOADERS_STYLES_PROD)
    },
    resolve: {
      root: [SRC_DIR],
      extensions: ['', '.ts', '.tsx', '.js', '.jsx', '.css'],
    },
    plugins: [
      new CleanPlugin([BUILD_DIR], { root: PROJECT_ROOT }),
      // extract inline css from modules into separate files
      new ExtractTextPlugin('styles/[name].[contenthash].css', {
        allChunks: true
      }),
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        }
      } as any),
      new webpack.DefinePlugin({
        __CLIENT__: true,
        __DEVCLIENT__: false,
        __DEVSERVER__: false,
        __BASENAME__: BASENAME,
        __DEVTOOLS__: false
      }),
      new InlineEnviromentconstiablesPlugin({ NODE_ENV: 'production' }),
      assetsPluginInstance
    ],
    postcss: POST_CSS_CONFIG_PROD
  }, {
    // The configuration for the server-side rendering
    name: 'server-side rendering',
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
      extensions: ['', '.ts', '.tsx', '.js', '.jsx', '.css'],
    },
    plugins: [
      new webpack.BannerPlugin('require("source-map-support").install();',
        { raw: true, entryOnly: false }),
      // Order the modules and chunks by occurrence.
      // This saves space, because often referenced modules
      // and chunks get smaller ids.
      new webpack.optimize.OccurenceOrderPlugin(true),
      new ExtractTextPlugin('styles/[name].[contenthash].css', {
        allChunks: true
      }),
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        }
      } as any),
      new webpack.DefinePlugin({
        __CLIENT__: false,
        __DEVCLIENT__: false,
        __DEVSERVER__: false,
        __BASENAME__: BASENAME,
        __DEVTOOLS__: false
      }),
      new InlineEnviromentconstiablesPlugin({ NODE_ENV: 'production' }),
      assetsPluginInstance
    ],
    postcss: POST_CSS_CONFIG_PROD
  }
];

export = webpackConfig;

