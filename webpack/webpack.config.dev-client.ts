import * as webpack from 'webpack';
import {Configuration} from 'webpack';
import {
  LOADERS_COMMON,
  SRC_DIR,
  HOT_MIDDLEWARE,
  ASSETS_DIR,
  DEVTOOLS,
  BASENAME,
  PUBLIC_PATH,
  LOADERS_STYLES_DEV,
  NODE_MODULES,
  PORT,
  PROJECT_ROOT,
  POST_CSS_CONFIG_DEV
} from './webpack.constants';


const webpackConfig: Configuration = {
  cache: true,
  devtool: 'eval',
  context: PROJECT_ROOT,
  entry: {
    'main': [
      'react-hot-loader/patch',
      HOT_MIDDLEWARE,
      'bootstrap-loader',
      /*     './node_modules/bootstrap/dist/css/bootstrap.css',*/
      `${SRC_DIR}/client`
    ]
  },
  output: {
    path: ASSETS_DIR,
    filename: '[name].js',
    publicPath: `http://localhost:${PORT + 1}${PUBLIC_PATH}`,
  },
  module: {
    loaders: LOADERS_COMMON
      .concat(
      LOADERS_STYLES_DEV,
      [
        // Bootstrap 3
        { test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports?jQuery=jquery' },
      ]
      )
  },
  resolve: {
    root: [SRC_DIR],
    extensions: ['', '.ts', '.tsx', '.js'],

  },
  resolveLoader: {
    modulesDirectories: [NODE_MODULES]
  },
  plugins: [
    new webpack['DllReferencePlugin']({
      context: PROJECT_ROOT,
      manifest: require(ASSETS_DIR + '/vendor-manifest.json'),
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),

    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      },
      __CLIENT__: true,
      __DEVCLIENT__: true,
      __DEVSERVER__: false,
      __BASENAME__: BASENAME,
      __DEVTOOLS__: DEVTOOLS
    }),

  ]

};

// The configuration for the client
webpackConfig['name'] = 'dev-client';
webpackConfig['postcss'] = POST_CSS_CONFIG_DEV;
export = webpackConfig;
