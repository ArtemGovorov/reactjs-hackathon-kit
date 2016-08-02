const ExtractTextPlugin = require('extract-text-webpack-plugin');
import {resolve, join} from 'path';
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');

import * as webpack from 'webpack';

interface FileLoader {
  test: RegExp;
  loader: string;
  query: {
    name: string,
    limit: number,
    mimeType?: string;
  };
}

export const NAME_SERVER: string = 'server';
export const NAME_DLL: string = 'DLL';
export const NAME_CLIENT: string = 'client';
export const HOST = process.env.HOST || 'localhost';
export const PORT = process.env.PORT || 3000;
export const BUILD_DIR = resolve(__dirname, '../', 'public');
export const ASSETS_DIR = join(__dirname, '../', 'public', 'assets');
// The output path from the view of the Javascript
export const PUBLIC_PATH = '/assets/';
export const FILE_NAME = '[name].[hash].js';
export const SRC_DIR = resolve(__dirname, '../', 'src');
export const NODE_MODULES = resolve(__dirname, '../', 'node_modules');
export const PROJECT_ROOT = resolve(__dirname, '../');
export const DEV = process.env.NODE_ENV === 'development';
export const PROD = process.env.NODE_ENV === 'production';
export const TEST = process.env.NODE_ENV === 'test';
export const BASENAME = JSON.stringify(process.env.BASENAME || '');
export const DEVTOOLS: boolean = false;
export const HOT_MIDDLEWARE = 'webpack-hot-middleware/client?reload=true&path=http://' + 'localhost' + ':' + (PORT + 1) + '/__webpack_hmr';

export const EXTERNALS = getExternals();
const URL_BYTE_LIMIT: number = 20000;
const IMAGES_LOADER_NAME = 'images/[name].[ext]';
const FONTS_LOADER_NAME = 'fonts/[name].[ext]';

const LOADER_LESS_QUERY = '!css-loader?'
  + '-minimize&modules&importLoaders=1&localIdentName=[local]___[hash:base64:5]!postcss!less?outputStyle=expanded&sourceMap';

const LOADER_SCSS_QUERY = 'css-loader?'
  + '-minimize&modules&importLoaders=1&localIdentName=[local]___[hash:base64:5]!postcss';

const LOADER_CSS_FAKE = {
  test: /\.css$/,
  loader: 'isomorphic-style-loader!' + 'css?module&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
};

const LOADER_CSS = {
  test: /\.css$/,
  loader: 'isomorphic-style-loader!' + 'css?module&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
};


/*const LOADER_LESS_PROD = {
  test: /\.less$/,
  loader: ExtractTextPlugin.extract('isomorphic-style-loader', LOADER_LESS_QUERY)

};*/

const LOADER_SCSS_DEV = {
  test: /\.scss$/,
  loader: 'isomorphic-style-loader!' + 'css-loader?'
  + '&modules&importLoaders=1&localIdentName=[local]___[hash:base64:5]!postcss'
};

const LOADER_SCSS_FAKE = {
  test: /\.scss$/,
  loader: 'isomorphic-style-loader!' + 'css-loader?'
  + '&modules&importLoaders=1&localIdentName=[local]___[hash:base64:5]!postcss'
};

/*const LOADER_SCSS_PROD = {
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract('isomorphic-style-loader', LOADER_SCSS_QUERY)
};*/
export const LOADERS_STYLES_DEV = []
  .concat(
  LOADER_SCSS_DEV,
  LOADER_CSS
  );

export const LOADERS_STYLES_PROD = []
  .concat(
  LOADER_CSS
  );

export const LOADERS_STYLES_FAKE = []
  .concat(
  LOADER_SCSS_FAKE,
  LOADER_CSS_FAKE
  );

export const LOADER_TS = {
  test: /\.tsx?$/,
  loader: 'awesome-typescript-loader',
  include: SRC_DIR,
  exclude: NODE_MODULES
};

export const LOADER_TS_DLL = {
  test: /\.tsx?$/,
  loader: 'awesome-typescript-loader',
  include: SRC_DIR,
  exclude: NODE_MODULES
};


export const LOADER_TS_CLIENT = {
  test: /\.tsx?$/,
  loaders: ['awesome-typescript-loader?module=es6&useBabel=true'],
  exclude: [/node_modules/, BUILD_DIR],
};


const LOADER_JSON = {
  test: /\.json$/,
  loader: 'json-loader'
};

const LOADER_WOFF =
  fileLoaderFactory(
    /\.woff(\?.*)?$/,
    FONTS_LOADER_NAME,
    URL_BYTE_LIMIT,
    'application/font-woff');

const LOADER_WOFF2 =
  fileLoaderFactory(
    /\.woff2(\?.*)?$/,
    FONTS_LOADER_NAME,
    URL_BYTE_LIMIT,
    'application/font-woff2');

const LOADER_OTF =
  fileLoaderFactory(
    /\.otf(\?.*)?$/,
    FONTS_LOADER_NAME,
    URL_BYTE_LIMIT,
    'mimetype=font/opentype');

const LOADER_TTF =
  fileLoaderFactory(
    /\.ttf(\?.*)?$/,
    FONTS_LOADER_NAME,
    URL_BYTE_LIMIT,
    'application/octet-stream');

const LOADER_EOT =
  fileLoaderFactory(
    /\.eot(\?.*)?$/,
    FONTS_LOADER_NAME,
    URL_BYTE_LIMIT);

const LOADER_IMAGES = {
  test: /\.(jp[e]?g|png|gif|svg)$/i,
  loader: 'url-loader',
  query: {
    name: IMAGES_LOADER_NAME,
    limit: URL_BYTE_LIMIT
  }
};



const LOADER_HTML = {
  test: /\.html$/,
  loader: 'html-loader'
};

export const LOADERS_FONTS = [
  LOADER_WOFF,
  LOADER_WOFF2,
  LOADER_EOT,
  LOADER_OTF,
  LOADER_TTF
];

export const LOADERS_COMMON = [
  LOADER_JSON,
  LOADER_IMAGES,
  LOADER_HTML
]
  .concat(LOADERS_FONTS);

export const POST_CSS_CONFIG_DEV = postCSSConfig;
export const POST_CSS_CONFIG_PROD = postCSSConfig;

export const PLUG_IN_PROGRESS = new ProgressBarPlugin({
  clear: true,
  width: 30,
  summary: false,
  incomplete: '😬 ',
  complete: '😜 ',
  customSummary: () => { },
  format: '  [:bar] ' + chalk.green.bold(':percent'),
});

function fileLoaderFactory(
  test: RegExp,
  name: string,
  limit: number,
  mimeType: string = ''
): FileLoader {
  return {
    test: test,
    loader: 'url-loader',
    query: {
      name: name,
      limit: limit,
      mimeType: mimeType
    }
  };
}

/*function getExternals() {
  const nodeModules = {};
  fs.readdirSync('node_modules')
    .filter(function (x) {
      return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function (mod) {
      nodeModules[mod] = 'commonjs ' + mod;
    });

  console.log(nodeModules);
  return nodeModules;
};*/

function getExternals() {
  const Fs = require('fs');
  const nodeModules = {};
  Fs.readdirSync('node_modules').forEach(function (module) {
    if (module !== '.bin') {
      nodeModules[module] = true;
    }
  });
  const nodeModulesTransform = function (context, request, callback) {
    // search for a '/' indicating a nested module
    const slashIndex = request.indexOf('/');
    let rootModuleName;
    if (slashIndex == -1) {
      rootModuleName = request;
    } else {
      rootModuleName = request.substr(0, slashIndex);
    }


    // Match for root modules that are in our node_modules
    if (nodeModules.hasOwnProperty(rootModuleName)
      && request !== 'webpack/hot/poll?1000') {
      callback(null, 'commonjs ' + request);
    } else {
      callback();
    }
  };

  return nodeModulesTransform;

}

function postCSSConfig() {
  return [
    require('postcss-import')({
      path: join(__dirname, '../', 'src', 'styles'),
      // addDependencyTo is used for hot-reloading in webpack
      addDependencyTo: webpack
    }),
    // Note: you must set postcss-mixins before simple-vars and nested
    require('postcss-mixins')(),
    require('postcss-simple-vars')(),
    // Unwrap nested rules like how Sass does it
    require('postcss-nested')(),
    //  parse CSS and add vendor prefixes to CSS rules
    require('autoprefixer')({
      browsers: ['last 2 versions', 'IE > 8']
    }),
    // A PostCSS plugin to console.log() the messages registered by other
    // PostCSS plugins
    require('postcss-reporter')({
      clearMessages: true
    })
  ];
};