import {join, resolve} from 'path';
import * as webpack from 'webpack';
import {Configuration} from 'webpack';
const assetsPath = join(__dirname, '..', 'public', 'assets');
const APP_DIR = resolve(__dirname, '..', 'src');
const BUILD_DIR = resolve(__dirname, '..', 'public');
const PROJECT_ROOT = resolve(__dirname, '..');
const CleanPlugin = require('clean-webpack-plugin');
const BASELINE = JSON.stringify(process.env.BASENAME || '');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const fs = require('fs');

const nodeModules = {};
fs.readdirSync('node_modules')
  .filter(function (x) {
    return ['.bin'].indexOf(x) === -1;
  })
  .forEach(function (mod) {
    nodeModules[mod] = 'commonjs ' + mod;
  });

const commonLoaders = [
  {
    test: /\.tsx?$/,
    loader: 'ts-loader',
    include: join(__dirname, '..', 'src'),
    exclude: join(__dirname, '..', 'node_modules')
  },
  {
    test: /\.json$/,
    loader: 'json-loader'
  },
  { test: /\.woff(\?.*)?$/, loader: 'url?name=fonts/[name].[ext]&limit=10000&mimetype=application/font-woff' },
  { test: /\.woff2(\?.*)?$/, loader: 'url?name=fonts/[name].[ext]&limit=10000&mimetype=application/font-woff2' },
  { test: /\.otf(\?.*)?$/, loader: 'file?name=fonts/[name].[ext]&limit=10000&mimetype=font/opentype' },
  { test: /\.ttf(\?.*)?$/, loader: 'url?name=fonts/[name].[ext]&limit=10000&mimetype=application/octet-stream' },
  { test: /\.eot(\?.*)?$/, loader: 'file?name=fonts/[name].[ext]' },
  { test: /\.svg(\?.*)?$/, loader: 'url?name=fonts/[name].[ext]&limit=10000&mimetype=image/svg+xml' },
  { test: /\.(png|jpg)$/, loader: 'url?limit=8192&name=images/[name].[ext]' },
  { test: /\.html$/, loader: 'html-loader' }
];

const webpackConfig: Configuration = {

  context: join(__dirname, '..', 'src'),
  entry: {
    server: [
      `bootstrap-sass!${APP_DIR}/theme/bootstrap.config.prod.js`,
      `font-awesome-webpack!${APP_DIR}/theme/font-awesome.config.prod.js`,
      './server/index.js'
    ]
  },
  target: 'node',
  output: {
    // The output directory as absolute path
    path: assetsPath,
    // The filename of the entry chunk as relative path inside the output.path directory
    filename: 'server.js',
    // The output path from the view of the Javascript
    publicPath: '/assets/',
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: commonLoaders.concat([
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap&-minimize&modules&importLoaders=1&sourceMap&localIdentName=[local]___[hash:base64:5]!postcss!less?outputStyle=expanded&sourceMap')
      },

      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap&-minimize&modules&importLoaders=1&sourceMap&localIdentName=[local]___[hash:base64:5]!postcss!sass?outputStyle=expanded&sourceMap')
      }

    ])
  },
  resolve: {
    root: [join(__dirname, '..', 'src')],
    extensions: ['', '.ts', '.tsx', '.js', '.jsx', '.css'],
  },
  devtool: 'sourcemap',
  plugins: [
    new CleanPlugin([BUILD_DIR], { root: PROJECT_ROOT }),
    new ExtractTextPlugin('styles/main.css'),
    new webpack.BannerPlugin('require("source-map-support").install();',
      { raw: true, entryOnly: false }),
    new webpack.DefinePlugin({
      __CLIENT__: false,
      __DEVCLIENT__: false,
      __DEVSERVER__: true,
      __BASENAME__: BASELINE,
      __DEVTOOLS__: false
    })
  ]
};

// The configuration for the server-side rendering
webpackConfig['name'] = 'server-side rendering';
webpackConfig['externals'] = nodeModules as any;
export = webpackConfig;