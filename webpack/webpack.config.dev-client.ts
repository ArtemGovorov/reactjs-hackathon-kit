import {join, resolve} from 'path';
import * as webpack from 'webpack';
import {Configuration} from 'webpack';
const assetsPath = join(__dirname, '..', 'public', 'assets');
const hotMiddlewareScript = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=true';
const APP_DIR = resolve(__dirname, '..', 'src');
const DEVTOOLS = false;
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
    test: /\.(jp[e]?g|png|gif|svg)$/i,
    loader: 'file-loader?name=img/[name].[ext]'
  }
  ,
  { test: /\.html$/, loader: 'html-loader' }
];

const postCSSConfig = function () {
  return [
    require('postcss-import')({
      path: join(__dirname, '..', 'src', 'theme'),
      // addDependencyTo is used for hot-reloading in webpack
      addDependencyTo: webpack
    }),
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

const webpackConfig: Configuration = {
  // eval - Each module is executed with eval and //@ sourceURL.
  devtool: 'eval',
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
  context: join(__dirname, '..', 'src'),
  // Multiple entry with hot loader
  // https://github.com/glenjamin/webpack-hot-middleware/blob/master/example/webpack.config.multientry.js
  entry: {
    'main': [
      'react-hot-loader/patch',
      hotMiddlewareScript,
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
    publicPath: '/assets/'
  },
  module: {
    loaders: commonLoaders.concat([
      {
        test: /\.less$/,
        loader: 'style!css?module&localIdentName=[name]__[local]___[hash:base64:5]!postcss!less'
      },
      {
        test: /\.scss$/,
        loader: 'style!css?module&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass'
      }
    ])
  },
  resolve: {
    root: [join(__dirname, '..', 'src')],
    extensions: ['', '.ts', '.tsx', '.js', '.jsx', '.css', '.scss'],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __DEVCLIENT__: true,
      __DEVSERVER__: false,
      __BASENAME__: BASELINE,
      __DEVTOOLS__: DEVTOOLS
    })
  ]

};

// The configuration for the client
webpackConfig['name'] = 'browser';
webpackConfig['postcss'] = postCSSConfig;
export = webpackConfig;
