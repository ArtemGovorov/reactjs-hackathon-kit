import {join, resolve} from 'path';
import * as webpack from 'webpack';
import {Configuration} from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import InlineEnviromentconstiablesPlugin from 'inline-environment-variables-webpack-plugin';

const BUILD_DIR = resolve(__dirname, '..', 'public');
const PROJECT_ROOT = resolve(__dirname, '..', 'public');
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
  {
    test: /\.(png|jpg|jpeg|gif)$/,
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
  ,
  { test: /\.html$/, loader: 'html-loader' }
];

const postCSSConfig = function () {
  return [
    require('postcss-import')(),
    // Note: you must set postcss-mixins before simple-consts and nested
    require('postcss-mixins')(),
    require('postcss-simple-consts')(),
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
    /* The entry point of the bundle
     * Entry points for multi page app could be more complex
     * A good example of entry points would be:
     * entry: {
     *   pageA: "./pageA",
     *   pageB: "./pageB",
     *   pageC: "./pageC",
     *   adminPageA: "./adminPageA",
     *   adminPageB: "./adminPageB",
     *   adminPageC: "./adminPageC"
     * }
     *
     * We can then proceed to optimize what are the common chunks
     * plugins: [
     *  new CommonsChunkPlugin("admin-commons.js", ["adminPageA", "adminPageB"]),
     *  new CommonsChunkPlugin("common.js", ["pageA", "pageB", "admin-commons.js"], 2),
     *  new CommonsChunkPlugin("c-commons.js", ["pageC", "adminPageC"]);
     * ]
     */
    // A SourceMap is emitted.
    devtool: 'source-map',
    context: join(__dirname, '..', 'app'),
    entry: {
      app: './client'
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
      loaders: commonLoaders
    },
    resolve: {
      root: [join(__dirname, '..', 'app')],
      extensions: ['', '.js', '.jsx', '.css']
    },
    plugins: [
      // extract inline css from modules into separate files
      new ExtractTextPlugin('styles/main.css'),
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false
        }
      } as any),
      new webpack.DefinePlugin({
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
    context: join(__dirname, '..', 'app'),
    entry: {
      server: './server'
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
      loaders: commonLoaders
    },
    resolve: {
      root: [join(__dirname, '..', 'app')],
      extensions: ['', '.js', '.jsx', '.css']
    },
    plugins: [
      new CleanPlugin([BUILD_DIR], { root: PROJECT_ROOT }),
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

