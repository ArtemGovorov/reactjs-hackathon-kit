import * as webpack from 'webpack';
import {Configuration} from 'webpack';
import {
  LOADERS_COMMON,
  SRC_DIR,
  ASSETS_DIR,
  BASENAME,
  PUBLIC_PATH,
  FILE_NAME,
  LOADERS_STYLES_DEV,
} from './webpack.constants';

const webpackConfig: Configuration = {
  devtool: 'cheap-module-source-map',
  context: SRC_DIR,
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
    root: SRC_DIR,
    extensions: ['', '.ts', '.tsx', '.js', '.json'],
    alias: {
      sinon: 'sinon/pkg/sinon.js'
    }
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: null, // if no value is provided the sourcemap is inlined
      test: /\.(ts|js)($|\?)/i // process .js and .ts files only
    }),
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