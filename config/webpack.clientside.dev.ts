import * as webpack from "webpack";
import {Configuration} from "webpack";
import * as path from "path";
import {APP_DIR, BUILD_DIR} from "./webpack.constants";
const ExtractTextPlugin = require("extract-text-webpack-plugin");
var cssnano = require('cssnano');
const AssetsPlugin = require('assets-webpack-plugin');
const webpackDevConfig: Configuration = {
  cache: true,
  devtool: 'eval',
  entry: {
    'main': [
      "webpack-dev-server/client?http://localhost:8080",
      "webpack/hot/only-dev-server",
      `bootstrap-sass!${APP_DIR}/theme/bootstrap.config.js`,
      `font-awesome-webpack!${APP_DIR}/theme/font-awesome.config.js`,
      `${APP_DIR}/client`
    ]
  },
  output: {
    filename: '[name]-[hash].js',
    chunkFilename: '[name]-[chunkhash].js',
    path: BUILD_DIR,
    publicPath: "/"
  },
  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        include: APP_DIR,
        loaders: [
          "react-hot",
          "ts-loader"
        ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.less$/,
        loader:
        'style!css?sourceMap&-minimize&modules&importLoaders=1&sourceMap&localIdentName=[local]___[hash:base64:5]!postcss!less?outputStyle=expanded&sourceMap'
      },
      {
        test: /\.scss$/,
        loader: 'style!css?sourceMap&-minimize&modules&importLoaders=1&sourceMap&localIdentName=[local]___[hash:base64:5]!postcss!sass?outputStyle=expanded&sourceMap'
      },
      {
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/font-woff"
      },
      {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=application/octet-stream"
      },
      {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: "file"
      },
      {
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
        loader: "url?limit=10000&mimetype=image/svg+xml"
      },
      {
        test: /\.(html|ico)$/,
        loader: "file-loader?name=[name].[ext]"
      },
      {
        test: /\.(jp[e]?g|png|gif|svg)$/i,
        loader: "file-loader?name=img/[name].[ext]"
      }
    ]
  },

  resolve: {
    extensions: ["", ".ts", ".tsx", ".js", ".jsx"]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new AssetsPlugin({
      filename: 'webpack.assets.json',
      path: BUILD_DIR,
      prettyPrint: true
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
]

export = webpackDevConfig;
