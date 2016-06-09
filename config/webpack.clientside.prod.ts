import * as webpack from 'webpack';
import {Configuration} from 'webpack';
import {APP_DIR, BUILD_DIR, PROJECT_ROOT} from './webpack.constants';
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const cssnano = require('cssnano');
const AssetsPlugin = require('assets-webpack-plugin');
const CleanPlugin = require('clean-webpack-plugin');
const webpackProdConfig: Configuration = {
	entry: [
    `bootstrap-sass!${APP_DIR}/theme/bootstrap.config.prod.js`,
    `font-awesome-webpack!${APP_DIR}/theme/font-awesome.config.prod.js`,
    `${APP_DIR}/client`
	],
	output: {
    filename: '[name]-[chunkhash].js',
    chunkFilename: '[name]-[chunkhash].js',
    path: BUILD_DIR,
    publicPath: '/'
	},
	module: {
    loaders: [
			{
				test: /\.tsx?$/,
				loader: 'ts-loader'
			},
			{
				test: /\.json$/,
				loader: 'json-loader'
			},
			{
				test: /\.less$/,
				loader: 'style!css?sourceMap&-minimize&modules&importLoaders=1&sourceMap&localIdentName=[local]___[hash:base64:5]!postcss!less?outputStyle=expanded&sourceMap'
			},
      {
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css?sourceMap&-minimize&modules&importLoaders=1&sourceMap&localIdentName=[local]___[hash:base64:5]!postcss!sass?outputStyle=expanded&sourceMap')
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
				test: /\.(jp[e]?g|png|gif|svg)$/i,
				loader: 'file-loader?name=img/[name].[ext]'
			},
			{
				test: /\.(html|ico)$/,
				loader: 'file-loader?name=[name].[ext]'
			}
    ]
	},
	resolve: {
    extensions: ['', '.ts', '.tsx', '.js', '.jsx']
	},
	plugins: [
    new CleanPlugin([BUILD_DIR], { root: PROJECT_ROOT }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor']
    }),
    // css files from the extract-text-plugin loader
    new ExtractTextPlugin('[name]-[chunkhash].css', { allChunks: true }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      },
      __BASENAME__: JSON.stringify(process.env.BASENAME || ''),
      __CLIENT__: true,
      __SERVER__: false,
      __DEV__: false,
      __DEVTOOLS__: false
    }),

    new AssetsPlugin({
      filename: 'webpack.assets.json',
      path: `${APP_DIR}/server`,
      prettyPrint: true
    }),

    // optimizations
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(false),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      },
      comments: false,
      sourceMap: false,
      mangle: true,
      minimize: true
    } as any)
	]
};

webpackProdConfig['postcss'] = [
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

export = webpackProdConfig;
