import * as webpack from 'webpack';
import {Configuration} from 'webpack';
import {APP_DIR, BUILD_DIR, PROJECT_ROOT} from './webpack.constants';
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const cssnano = require('cssnano');
const webpackDevConfig: Configuration = {
  cache: true,
  devtool: 'source-map',
  output: {
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    path: BUILD_DIR,
    publicPath: '/'
  },
  module: {
    loaders: [
      {
        test: /\.ts?$/,
        include: APP_DIR,
        loaders: [
          'ts-loader'
        ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin
          .extract(
          'style-loader',
          `css?
          sourceMap&
          -minimize&
          modules&
          importLoaders=1&
          sourceMap&
          localIdentName=[local]___[hash:base64:5]
          !postcss
          !less?
          outputStyle=expanded&
          sourceMap`
          )
      },
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin
          .extract(
          'style-loader',
          `css?
           sourceMap&
           -minimize&
           modules&
           importLoaders=1&
           sourceMap&
           localIdentName=[local]___[hash:base64:5]
           !postcss
           !sass?outputStyle=expanded&
           sourceMap`
          )
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
        loader: 'file'
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url?limit=10000&mimetype=image/svg+xml'
      },
      {
        test: /\.(html|ico)$/,
        loader: 'file-loader?name=[name].[ext]'
      },
      {
        test: /\.(jp[e]?g|png|gif|svg)$/i,
        loader: 'file-loader?name=img/[name].[ext]'
      }
    ]
  },

  resolve: {
    extensions: ['', '.ts', '.tsx', '.js', '.jsx', '.json']
  },
  plugins: [
    new ExtractTextPlugin('[name]-[chunkhash].css', { allChunks: true }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"test"'
      },
      __BASENAME__: JSON.stringify(process.env.BASENAME || ''),
      __DEV__: false,
      __DEVTOOLS__: false
    }),
  ]
};

webpackDevConfig['postcss'] = [
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

export = webpackDevConfig;
