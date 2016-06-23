import {join, resolve} from 'path';
import * as webpack from 'webpack';
import {Configuration} from 'webpack';
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const InlineEnviromentconstiablesPlugin = require('inline-environment-variables-webpack-plugin');
const APP_DIR = resolve(__dirname, '..', 'src');
const BUILD_DIR = resolve(__dirname, '..', 'public');
const PROJECT_ROOT = resolve(__dirname, '..');
const BASELINE = JSON.stringify(process.env.BASENAME || '');
const CleanPlugin = require('clean-webpack-plugin');
const assetsPath = join(__dirname, '..', 'public', 'assets');
const publicPath = '/assets/';

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
  { test: /\.woff(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff' },
  { test: /\.woff2(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/font-woff2' },
  { test: /\.otf(\?.*)?$/, loader: 'file?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=font/opentype' },
  { test: /\.ttf(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=application/octet-stream' },
  { test: /\.eot(\?.*)?$/, loader: 'file?prefix=fonts/&name=[path][name].[ext]' },
  { test: /\.svg(\?.*)?$/, loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=10000&mimetype=image/svg+xml' },
  { test: /\.(png|jpg)$/, loader: 'url?limit=8192' },
  { test: /\.html$/, loader: 'html-loader' }
];

const postCSSConfig = function () {
  return [
    require('postcss-import')(),
    // Note: you must set postcss-mixins before simple-consts and nested
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

const webpackConfig: Configuration = [
  {
    // The configuration for the client
    name: 'browser',
    devtool: 'source-map',
    context: join(__dirname, '..', 'src'),
    entry: {
      'main': [
        `bootstrap-sass!${APP_DIR}/theme/bootstrap.config.js`,
        `font-awesome-webpack!${APP_DIR}/theme/font-awesome.config.js`,
        `${APP_DIR}/client`
      ]
    },
    output: {
      // The output directory as absolute path
      path: assetsPath,
      // The filename of the entry chunk as relative path inside the output.path directory
      filename: '[name].js',
      // The output path from the view of the Javascript
      publicPath: publicPath

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
    plugins: [
      new CleanPlugin([BUILD_DIR], { root: PROJECT_ROOT }),
      // extract inline css from modules into separate files
      new ExtractTextPlugin('styles/main.css'),
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        }
      } as any),
      new webpack.DefinePlugin({
        __CLIENT__: true,
        __DEVCLIENT__: false,
        __DEVSERVER__: false,
        __BASENAME__: BASELINE,
        __DEVTOOLS__: false
      }),
      new InlineEnviromentconstiablesPlugin({ NODE_ENV: 'production' })
    ],
    postcss: postCSSConfig
  }, {
    // The configuration for the server-side rendering
    name: 'server-side rendering',
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
      publicPath: publicPath,
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
    plugins: [
      new webpack.BannerPlugin('require("source-map-support").install();',
        { raw: true, entryOnly: false }),
      // Order the modules and chunks by occurrence.
      // This saves space, because often referenced modules
      // and chunks get smaller ids.
      new webpack.optimize.OccurenceOrderPlugin(true),
      new ExtractTextPlugin('styles/main.css'),
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        }
      } as any),
      new webpack.DefinePlugin({
        __CLIENT__: false,
        __DEVCLIENT__: false,
        __DEVSERVER__: false,
        __BASENAME__: BASELINE,
        __DEVTOOLS__: false
      }),
      new InlineEnviromentconstiablesPlugin({ NODE_ENV: 'production' })
    ]
  }
];

// The configuration for the client
webpackConfig['name'] = 'browser';
webpackConfig['postcss'] = postCSSConfig;
export = webpackConfig;

