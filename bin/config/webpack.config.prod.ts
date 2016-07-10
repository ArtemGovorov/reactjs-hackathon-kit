import * as webpack from 'webpack';
import {Configuration} from 'webpack';
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const InlineEnviromentconstiablesPlugin = require('inline-environment-variables-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const assetsPluginInstance = new AssetsPlugin({ prettyPrint: true });

import {
  SRC_DIR,
  ASSETS_DIR,
  BASENAME,
  PUBLIC_PATH,
  LOADERS_STYLES_PROD,
  PROJECT_ROOT,
  LOADERS_COMMON,
  FILE_NAME,
  POST_CSS_CONFIG_PROD,
  EXTERNALS,
  NODE_MODULES
} from './constants';

const webpackConfig: Configuration = [
  {
    // The configuration for the client
    name: 'browser',
    context: PROJECT_ROOT,
    entry: {
      'main': [
        'bootstrap-loader/extractStyles',
        `${SRC_DIR}/client`
      ]
    },
    output: {
      path: ASSETS_DIR,
      filename: FILE_NAME,
      publicPath: PUBLIC_PATH

    },
    progress: true,
    module: {
      loaders: LOADERS_COMMON
        .concat(LOADERS_STYLES_PROD)
    },
    resolve: {
      root: [SRC_DIR],
      extensions: ['', '.ts', '.tsx', '.js', '.jsx', '.css'],
    },
    resolveLoader: {
      modulesDirectories: [NODE_MODULES]
    },
    plugins: [

      new ExtractTextPlugin('styles/[name].[contenthash].css', {
        allChunks: true
      }),
      new webpack.optimize.OccurenceOrderPlugin(true),
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
    context: PROJECT_ROOT,
    entry: {
      server: [
        'bootstrap-loader/extractStyles',
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
    progress: true,
    module: {
      loaders: LOADERS_COMMON
        .concat(LOADERS_STYLES_PROD)
    },
    resolve: {
      root: [SRC_DIR],
      extensions: ['', '.ts', '.tsx', '.js', '.css']
    },
    externals: EXTERNALS as any,
    plugins: [
      new webpack.BannerPlugin('require("source-map-support").install();',
        { raw: true, entryOnly: false }),
      new ExtractTextPlugin('styles/[name].[contenthash].css', {
        allChunks: true
      }),
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