
import {Configuration} from 'webpack';
import {resolve} from 'path';
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
export const PORT = process.env.PORT || 8080;
export const BUILD_DIR = resolve(__dirname, '..', 'public');
export const SRC_DIR = resolve(__dirname, '..', 'src');
export const NODE_MODULES = resolve(__dirname, '..', 'node_modules');
export const PROJECT_ROOT = resolve(__dirname, '..');
export const DEV = process.env.NODE_ENV === 'development';
export const PROD = process.env.NODE_ENV === 'production';
export const TEST = process.env.NODE_ENV === 'test';
export const BASENAME = JSON.stringify(process.env.BASENAME || '');
export const DEVTOOLS: boolean = false;

const nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

export const EXTERNALS = nodeModules;

const URL_BYTE_LIMIT: number = 10000;
const IMAGES_LOADER_NAME = 'images/[name].[ext]';
const FONTS_LOADER_NAME = 'fonts/[name].[ext]';

export const LOADERS = {

  TS:
  {
    test: /\.tsx?$/,
    loader: 'ts-loader',
    include: SRC_DIR,
    exclude: NODE_MODULES
  },

  JSON:
  {
    test: /\.json$/,
    loader: 'json-loader'
  },

  WOFF:
  fileLoaderFactory(
    /\.woff(\?.*)?$/,
    FONTS_LOADER_NAME,
    URL_BYTE_LIMIT,
    'application/font-woff'),

  WOFF2:
  fileLoaderFactory(
    /\.woff2(\?.*)?$/,
    FONTS_LOADER_NAME,
    URL_BYTE_LIMIT,
    'application/font-woff2'),

  OTF:
  fileLoaderFactory(
    /\.otf(\?.*)?$/,
    FONTS_LOADER_NAME,
    URL_BYTE_LIMIT,
    'mimetype=font/opentype'),

  TTF:
  fileLoaderFactory(
    /\.ttf(\?.*)?$/,
    FONTS_LOADER_NAME,
    URL_BYTE_LIMIT,
    'application/octet-stream'),

  EOT:
  fileLoaderFactory(
    /\.eot(\?.*)?$/,
    FONTS_LOADER_NAME,
    URL_BYTE_LIMIT,
    'application/vnd.ms-fontobject'),

  SVG:
  fileLoaderFactory(
    /\.svg(\?.*)?$/,
    FONTS_LOADER_NAME,
    URL_BYTE_LIMIT,
    'image/svg+xml'),

  IMAGES:
  fileLoaderFactory(
    /\.(png|jpg|gif)$/,
    IMAGES_LOADER_NAME,
    URL_BYTE_LIMIT),

  HTML:
  {
    test: /\.html$/,
    loader: 'html-loader'
  }

};


export const LOADERS_FONTS = [
  LOADERS.WOFF,
  LOADERS.WOFF2,
  LOADERS.OTF,
  LOADERS.TTF,
  LOADERS.SVG
];

export const LOADERS_COMMON = [
  LOADERS.TS,
  LOADERS.JSON,
  LOADERS.IMAGES,
  LOADERS.HTML
].
  concat(LOADERS_FONTS);

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





