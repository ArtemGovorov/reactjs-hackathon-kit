import {join, resolve} from 'path';
import * as webpack from 'webpack';
import {Configuration} from 'webpack';
const assetsPath = join(__dirname, '..', 'public', 'assets');
const APP_DIR = resolve(__dirname, '..', 'src');
const BUILD_DIR = resolve(__dirname, '..', 'public');
const PROJECT_ROOT = resolve(__dirname, '..', 'public');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const BASELINE = JSON.stringify(process.env.BASENAME || '');
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
  {
    test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot)$/,
    loader: 'url',
    query: {
      name: '[hash].[ext]',
      limit: 10000,
    }
  },
  {
    test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url?limit=10000&mimetype=application/font-woff'
  },
  {
    test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url?limit=10000&mimetype=application/font-woff'
  },
  {
    test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url?limit=10000&mimetype=application/octet-stream'
  },
  {
    test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'file-loader'
  },
  {
    test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
    loader: 'url?limit=10000&mimetype=image/svg+xml'
  },
  {
    test: /\.(jp[e]?g|png|gif|svg)$/i,
    loader: 'file-loader?name=img/[name].[ext]'
  }
  ,
  { test: /\.html$/, loader: 'html-loader' }
];

const webpackConfig: Configuration = {

  context: join(__dirname, '..', 'src'),
  entry: {
    server: [
      `bootstrap-sass!${APP_DIR}/theme/bootstrap.config.prod.js`,
      `font-awesome-webpack!${APP_DIR}/theme/font-awesome.config.prod.js`,
      `${APP_DIR}/server`
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
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?module!postcss!less')
      },

      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?module!sass')
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?module!postcss-loader')
      }

    ])
  },
  resolve: {
    root: [join(__dirname, '..', 'src')],
    extensions: ['', '.ts', '.tsx', '.js', '.jsx', '.css'],
  },
  plugins: [
    new CleanPlugin([BUILD_DIR], { root: PROJECT_ROOT }),
    new ExtractTextPlugin('styles/main.css'),
    new webpack.DefinePlugin({
      __DEVCLIENT__: false,
      __DEVSERVER__: true,
      __BASENAME__: BASELINE,
      __DEVTOOLS__: false
    })
  ]
};

// The configuration for the server-side rendering
webpackConfig['name'] = 'server-side rendering';
export = webpackConfig;