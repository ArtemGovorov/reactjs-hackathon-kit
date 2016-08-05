import * as webpack from 'webpack';

const InlineEnviromentconstiablesPlugin = require('inline-environment-variables-webpack-plugin');
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;

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
  NODE_MODULES,
  LOADER_TS,
  LOADERS_STYLES_FAKE,
  PLUG_IN_PROGRESS
} from '../constants';

const webpackConfig = {

  name: 'server',
  devtool: 'source-map',
  context: PROJECT_ROOT,
  entry: {
    server: [
      `${SRC_DIR}/server`
    ]

  },
  target: 'node',
  node: {
    console: true,
    global: false,
    __dirname: false,
    __filename: false,
  },
  output: {
    path: ASSETS_DIR,
    pathinfo: true,
    filename: 'server.js',
    publicPath: PUBLIC_PATH,
    libraryTarget: 'commonjs2'
  },
  module: {

    loaders: LOADERS_COMMON
      .concat(
      LOADERS_STYLES_FAKE, [LOADER_TS]
      )
  },
  resolve: {
    root: [SRC_DIR],
    extensions: ['', '.ts', '.tsx', '.js', '.css'],
    plugins: [
      new TsConfigPathsPlugin()
    ]
  },
  externals: EXTERNALS,
  plugins: [
    PLUG_IN_PROGRESS,
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    new (webpack as any).BannerPlugin(
      {
        banner: 'require("source-map-support").install();',
        raw: true,
        entryOnly: false
      }),
    new webpack.DefinePlugin({
      __CLIENT__: false,
      __DEVCLIENT__: false,
      __DEVSERVER__: false,
      __BASENAME__: BASENAME,
      __DEVTOOLS__: false
    }),
    new InlineEnviromentconstiablesPlugin({ NODE_ENV: 'production' })
  ],
  postcss: POST_CSS_CONFIG_PROD
};

export default webpackConfig;