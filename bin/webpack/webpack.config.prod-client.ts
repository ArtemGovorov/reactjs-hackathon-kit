import * as webpack from 'webpack';
const InlineEnviromentconstiablesPlugin = require('inline-environment-variables-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const assetsPluginInstance = new AssetsPlugin({ prettyPrint: true });
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;

import {
  SRC_DIR,
  ASSETS_DIR,
  BASENAME,
  PUBLIC_PATH,
  PROJECT_ROOT,
  LOADERS_COMMON,
  FILE_NAME,
  POST_CSS_CONFIG_PROD,
  NODE_MODULES,
  LOADERS_STYLES_DEV,
  LOADER_TS_CLIENT,
  PLUG_IN_PROGRESS
} from '../constants';

const webpackConfig = {
  // The configuration for the client
  name: 'client',
  context: PROJECT_ROOT,
  entry: {
    'main': [
      `${SRC_DIR}/client`
    ]
  },
  output: {
    path: ASSETS_DIR,
    filename: FILE_NAME,
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: PUBLIC_PATH

  },
  module: {
    loaders: (LOADERS_COMMON as any)
      .concat(
      LOADERS_STYLES_DEV, [LOADER_TS_CLIENT]
      )
  },
  resolve: {
    root: [SRC_DIR],
    extensions: ['', '.ts', '.tsx', '.js', '.css'],
    plugins: [
      new TsConfigPathsPlugin()
    ]
  },
  resolveLoader: {
    modulesDirectories: [NODE_MODULES]
  },
  plugins: [
    PLUG_IN_PROGRESS,
    new (webpack as any).optimize.OccurrenceOrderPlugin(true),
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
};


export default webpackConfig;