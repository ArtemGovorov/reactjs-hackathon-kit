import * as webpack from 'webpack';
import {Configuration} from 'webpack';
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
import {
  LOADERS_COMMON,
  SRC_DIR,
  ASSETS_DIR,
  BASENAME,
  LOADERS_STYLES_FAKE,
  EXTERNALS,
  PROJECT_ROOT,
  BUILD_DIR,
  NAME_SERVER
} from '../constants';

const webpackConfig: Configuration = {

  context: PROJECT_ROOT,
  entry: {
    server: [
      //'bootstrap-loader/extractStyles',
      //'webpack/hot/poll?1000',
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
  recordsPath: BUILD_DIR + '/server-records.json',
  output: {
    path: ASSETS_DIR,
    pathinfo: true,
    filename: 'server.js',
    publicPath: ASSETS_DIR,
    libraryTarget: 'commonjs2'
  },
  module: {

    loaders: LOADERS_COMMON
      .concat(
      LOADERS_STYLES_FAKE
      )
  },
  resolve: {
    root: [SRC_DIR],
    extensions: ['', '.ts', '.tsx', '.js', '.css'],
  },
  devtool: '#cheap-module-inline-source-map ',
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),
    new ForkCheckerPlugin(),
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
webpackConfig['name'] = NAME_SERVER;
webpackConfig['externals'] = EXTERNALS as any;


export = webpackConfig;