import * as webpack from 'webpack';
import {DEVTOOLS} from './webpack.constants';
module.exports = {

  resolve: {
    root: __dirname,
    extensions: ['', '.ts', '.tsx', '.js', '.jsx', '.json'],
    alias: {
      sinon: 'sinon/pkg/sinon.js'
    }
  },
  resolveLoader: {
    modulesDirectories: ['node_modules']
  },
  devtool: 'source-map-inline',
  externals: {
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': 'window'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"test"'
      },
      __BASENAME__: JSON.stringify(process.env.BASENAME || ''),
      __DEV__: false,
      __DEVTOOLS__: DEVTOOLS
    })
  ],
  module: {
    noParse: [
      /\/sinon\.js/
    ],
    loaders: [
      {
        test: /sinon(\\|\/)pkg(\\|\/)sinon\.js/,
        loader: 'imports?define=>false,require=>false'
      },
      {
        test: /\.ts(x?)$/,
        loaders: [
          'ts-loader'
        ]
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.html$/,
        exclude: /node_modules/,
        loader: 'raw'
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
        test: /\.(jp[e]?g|png|gif|svg)$/i,
        loader: 'file-loader?name=img/[name].[ext]'
      }
    ],
    postLoaders: [
      {
        test: /^((?!\.spec\.ts).)*.ts$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'istanbul-instrumenter'
      }
    ]
  }
};
