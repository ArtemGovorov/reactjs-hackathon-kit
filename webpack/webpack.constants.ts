const ExtractTextPlugin = require('extract-text-webpack-plugin');
import {resolve, join} from 'path';
const cssnano = require('cssnano');
const fs = require('fs');

interface FileLoader {
  test: RegExp;
  loader: string;
  query: {
    name: string,
    limit: number,
    mimeType?: string;
  };
}

export const HOST = process.env.HOST || 'localhost';
export const PORT = process.env.PORT || 3000;
export const BUILD_DIR = resolve(__dirname, '..', 'public');
export const ASSETS_DIR = join(__dirname, '..', 'public', 'assets');
// The output path from the view of the Javascript
export const PUBLIC_PATH = '/assets/';
export const FILE_NAME = '[name].[hash].js';
export const SRC_DIR = resolve(__dirname, '..', 'src');
export const NODE_MODULES = resolve(__dirname, '..', 'node_modules');
export const PROJECT_ROOT = resolve(__dirname, '..');
export const DEV = process.env.NODE_ENV === 'development';
export const PROD = process.env.NODE_ENV === 'production';
export const TEST = process.env.NODE_ENV === 'test';
export const BASENAME = JSON.stringify(process.env.BASENAME || '');
export const DEVTOOLS: boolean = true;
export const HOT_MIDDLEWARE = 'webpack-hot-middleware/client?path=http://' + 'localhost' + ':' + (PORT + 1) + '/__webpack_hmr';

export const EXTERNALS = getExternals();
const URL_BYTE_LIMIT: number = 5;
const IMAGES_LOADER_NAME = 'images/[name].[ext]';
const FONTS_LOADER_NAME = 'fonts/[name].[ext]';

const LOADER_LESS_QUERY = '!css-loader?'
  + 'sourceMap&-minimize&modules&importLoaders=1&sourceMap&localIdentName=[local]___[hash:base64:5]!postcss!less?outputStyle=expanded&sourceMap';

const LOADER_SCSS_QUERY = 'css-loader?'
  + 'sourceMap&-minimize&modules&importLoaders=1&sourceMap&localIdentName=[local]___[hash:base64:5]!postcss!sass?outputStyle=expanded&sourceMap';

const LOADER_LESS_DEV = {
  test: /\.less$/,
  loader: 'style-loader!' + LOADER_LESS_QUERY
};

const LOADER_LESS_PROD = {
  test: /\.less$/,
  loader: ExtractTextPlugin.extract('style-loader', LOADER_LESS_QUERY)

};

const LOADER_SCSS_DEV = {
  test: /\.scss$/,
  loader: 'style-loader!' + 'css-loader?'
  + 'sourceMap&&modules&importLoaders=1&sourceMap&localIdentName=[local]___[hash:base64:5]!postcss!sass?outputStyle=expanded&sourceMap'
};

const LOADER_SCSS_PROD = {
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract('style-loader', LOADER_SCSS_QUERY)
};

export const LOADERS_STYLES_DEV = []
  .concat(
  LOADER_LESS_DEV,
  LOADER_SCSS_DEV
  );

export const LOADERS_STYLES_PROD = []
  .concat(
  LOADER_LESS_PROD,
  LOADER_SCSS_PROD
  );

const LOADER_TS = {
  test: /\.tsx?$/,
  loader: 'ts-loader',
  include: SRC_DIR,
  exclude: NODE_MODULES
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

const LOADER_SVG =
  fileLoaderFactory(
    /\.svg(\?.*)?$/,
    FONTS_LOADER_NAME,
    URL_BYTE_LIMIT,
    'image/svg+xml');

const LOADER_IMAGES = {
  test: /\.(jp[e]?g|png|gif|svg)$/i,
  loader: 'url-loader',
  query: {
    name: IMAGES_LOADER_NAME,
    limit: URL_BYTE_LIMIT
  }
};

const LOADER_CSS = {
  test: /\.css$/,
  loaders: ['style', 'css']
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
  LOADER_TTF,
  LOADER_SVG
];

export const LOADERS_COMMON = [
  LOADER_TS,
  LOADER_JSON,
  LOADER_IMAGES,
  LOADER_HTML,
  LOADER_CSS
]
  .concat(LOADERS_FONTS);

export const POST_CSS_CONFIG_DEV = postCSSConfigDev;
export const POST_CSS_CONFIG_PROD = postCSSConfigProd;

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

function getExternals() {
  const nodeModules = {};
  fs.readdirSync('node_modules')
    .filter(function (x) {
      return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function (mod) {
      nodeModules[mod] = 'commonjs ' + mod;
    });
  return nodeModules;
};

function postCSSConfigDev() {
  return [
    cssnano({
      autoprefixer: {
        add: true,
        remove: true,
        browsers: ['last 2 versions']
      },
      discardComments: {
        removeAll: true
      },
      discardUnused: false,
      mergeIdents: false,
      reduceIdents: false,
      safe: true,
      sourcemap: true
    })
  ];
};

function postCSSConfigProd() {
  return [
    cssnano({
      autoprefixer: {
        add: true,
        remove: true,
        browsers: ['last 2 versions']
      },
      discardComments: {
        removeAll: true
      },
      discardUnused: false,
      mergeIdents: false,
      reduceIdents: false,
      safe: true,
      sourcemap: true
    })
  ];
};