import * as webpack from 'webpack';
import {
  LOADERS_COMMON,
  ASSETS_DIR,
  PUBLIC_PATH,
  LOADERS_STYLES_DEV,
  PROJECT_ROOT,
  PORT
} from './webpack.constants';


import { join}  from 'path';

module.exports = {
  devtool: 'inline-source-map',
  context: PROJECT_ROOT,
  name: 'dll',
  entry: {
    vendor: [
      'react',
      'react-dom',
      'react-dom/server',
      'react-hot-loader',
      'redux',
      'react-redux',
      'history/lib/createBrowserHistory',
      'react-router',
      'react-helmet',
      'react-proxy',
      'react-router',
      'history',
      'querystring',
      'strip-ansi',
      'ansi-regex',
      'ansi-html',
      'html-entities',
      'bootstrap',
      'es6-object-assign',
      'es6-promise',
      'process',
      'parse',
      '@reactivex/rxjs',
      'react-router-redux',
      'redux-observable',
      'rxjs',
      'redbox-react',
      'error-stack-parser',
      'stackframe',
      'bootstrap-loader',
    ]
  },
  output: {
    path: ASSETS_DIR,
    filename: '[name].dll.js',
    library: '[name]',
    publicPath: `http://localhost:${PORT}${PUBLIC_PATH}`,
  },
  module: {
    loaders: LOADERS_COMMON
      .concat(LOADERS_STYLES_DEV,
      [
        // Bootstrap 3
        { test: /bootstrap-sass\/assets\/javascripts\//, loader: 'imports?jQuery=jquery' },
      ]
      )
  },
  progress: true,
  resolve: {
    modulesDirectories: [
      'src',
      'assets',
      'node_modules'
    ],
    extensions: ['', '.json', '.js', '.jsx', '.ts', '.tsx']
  },
  plugins: [

    new webpack['DllPlugin']({
      name: '[name]',
      path: join(ASSETS_DIR, '[name]-manifest.json'),
    }),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    new webpack.DefinePlugin({
      // This speeds up some local libraries for me, you may not want it
      'process.env': {
        NODE_ENV: '"production"'
      },
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: false  // <-------- DISABLE redux-devtools HERE
    }),

  ]
};