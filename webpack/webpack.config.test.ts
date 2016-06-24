import * as webpack from 'webpack';
import {Configuration} from 'webpack';
import {
  LOADERS_COMMON,
  SRC_DIR,
  HOT_MIDDLEWARE,
  ASSETS_DIR,
  BASENAME,
  PUBLIC_PATH,
  FILE_NAME,
  LOADERS_STYLES_DEV
} from './webpack.constants';
const AssetsPlugin = require('assets-webpack-plugin');
const assetsPluginInstance = new AssetsPlugin({ prettyPrint: true });
const webpackConfig: Configuration = {
  devtool: 'source-map-inline',
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
    loaders: [
      {
        test: /sinon(\\|\/)pkg(\\|\/)sinon\.js/,
        loader: 'imports?define=>false,require=>false'
      }
    ]
      .concat(
      LOADERS_COMMON,
      LOADERS_STYLES_DEV),

    postLoaders: [
      {
        test: /^((?!\.spec\.ts).)*.ts$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'istanbul-instrumenter'
      }
    ]
  },
  resolve: {
    root: __dirname,
    extensions: ['', '.ts', '.tsx', '.js', '.json'],
    alias: {
      sinon: 'sinon/pkg/sinon.js'
    }
  },
  resolveLoader: {
    modulesDirectories: ['node_modules']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"test"'
      },
      __CLIENT__: false,
      __DEVCLIENT__: true,
      __DEVSERVER__: false,
      __BASENAME__: BASENAME,
      __DEVTOOLS__: false
    }),
    assetsPluginInstance
  ],
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': 'window'
  }
};

webpackConfig['name'] = 'test';
webpackConfig['noParse'] = [
  /\/sinon\.js/
];

export = webpackConfig;