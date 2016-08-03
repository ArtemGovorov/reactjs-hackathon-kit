import * as webpack from 'webpack';

const AssetsPlugin = require('assets-webpack-plugin');
const ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;

import {
  LOADERS_COMMON,
  SRC_DIR,
  HOT_MIDDLEWARE,
  ASSETS_DIR,
  DEVTOOLS,
  BASENAME,
  PUBLIC_PATH,
  LOADERS_STYLES_DEV,
  PORT,
  PROJECT_ROOT,
  POST_CSS_CONFIG_DEV,
  NAME_CLIENT,
  LOADER_TS_CLIENT

} from '../constants';

const webpackConfig = {

  devtool: 'eval',
  context: PROJECT_ROOT,
  entry: {
    'main': [
      'react-hot-loader/patch',
      HOT_MIDDLEWARE,
      `${SRC_DIR}/client`
    ]
  },
  output: {
    path: ASSETS_DIR,
    filename: '[name].js',
    chunkFilename: '[name]-[chunkhash].js',
    publicPath: `http://localhost:${PORT + 1}${PUBLIC_PATH}`,
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
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack['DllReferencePlugin']({
      context: PROJECT_ROOT,
      manifest: require(ASSETS_DIR + '/vendor-manifest.json'),
    }),
    new (webpack as any).LoaderOptionsPlugin({
      debug: true,
    }),
    new ForkCheckerPlugin(),
    new AssetsPlugin({
      filename: 'assets.json',
      path: ASSETS_DIR
    }),
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
webpackConfig['name'] = NAME_CLIENT;
webpackConfig['postcss'] = POST_CSS_CONFIG_DEV;
export default webpackConfig;
