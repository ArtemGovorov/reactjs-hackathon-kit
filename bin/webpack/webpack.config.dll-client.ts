import * as webpack from 'webpack';
import {
  LOADERS_COMMON,
  ASSETS_DIR,
  PUBLIC_PATH,
  PROJECT_ROOT,
  PORT,
  PLUG_IN_PROGRESS,
  NAME_DLL,
  LOADER_TS_DLL
} from '../constants';


import { join}  from 'path';

export default {
  devtool: 'inline-source-map',
  context: PROJECT_ROOT,
  name: NAME_DLL,
  entry: {
    vendor: [
      'react',
      'react-dom',
      'react-dom/server',
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
      'es6-object-assign',
      'es6-promise',
      'process',
      'parse',
      'react-router-redux',
      'redux-observable',
      'rxjs',
      'error-stack-parser',
      'stackframe',
      'classnames/bind.js',
      'react-addons-css-transition-group/index.js',
      'react/lib/ReactCSSTransitionGroup.js',
      'react/lib/ReactCSSTransitionGroupChild.js',
      'react/lib/ReactTransitionChildMapping.js',
      'react/lib/ReactTransitionEvents.js',
      'react/lib/ReactTransitionGroup.js'


    ]
  },
  output: {
    path: ASSETS_DIR,
    filename: '[name].dll.js',
    library: '[name]',
    publicPath: `http://localhost:${PORT}${PUBLIC_PATH}`,
  },
  module: {
    loaders: (LOADERS_COMMON as any).concat([LOADER_TS_DLL])
  },
  progress: true,
  resolve: {
    modulesDirectories: [
      'src',
      'assets',
      'node_modules'
    ],
    extensions: ['', '.json', '.js', '.jsx', '.ts', '.tsx', '.css']
  },
  plugins: [
    PLUG_IN_PROGRESS,
    new webpack['DllPlugin']({
      name: '[name]',
      path: join(ASSETS_DIR, '[name]-manifest.json'),
    }),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
      __DEVTOOLS__: false
    }),

  ]
};