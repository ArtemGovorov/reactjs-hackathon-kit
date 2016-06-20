"use strict";
var webpack = require('webpack');
var webpack_constants_1 = require('./webpack.constants');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var cssnano = require('cssnano');
var AssetsPlugin = require('assets-webpack-plugin');
var CleanPlugin = require('clean-webpack-plugin');
var webpackServerSideConfig = {
    devtool: 'cheap-module-source-map',
    entry: {
        main: [
            webpack_constants_1.APP_DIR + '/server/index.tsx'
        ]
    },
    target: 'node',
    externals: /^[a-z\-0-9]+$/,
    output: {
        filename: '[name]-[chunkhash].js',
        chunkFilename: '[name]-[chunkhash].js',
        path: webpack_constants_1.BUILD_DIR,
        publicPath: '/',
        libraryTarget: 'commonjs'
    },
    module: {
        loaders: [
            {
                test: /\.ts(x?)$/,
                include: webpack_constants_1.APP_DIR,
                loader: 'ts-loader'
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            { test: /\.less$/, loader: 'style!css?sourceMap&-minimize&modules&importLoaders=1&sourceMap&localIdentName=[local]___[hash:base64:5]!postcss!less?outputStyle=expanded&sourceMap' },
            { test: /\.scss$/, loader: ExtractTextPlugin.extract('style-loader', 'css?sourceMap&-minimize&modules&importLoaders=1&sourceMap&localIdentName=[local]___[hash:base64:5]!postcss!sass?outputStyle=expanded&sourceMap') },
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
                loader: 'file-loader?name=[name].[ext]'
            },
            {
                test: /\.(html|ico)$/,
                loader: 'file-loader?name=[name].[ext]'
            }
        ]
    },
    resolve: {
        modulesDirectories: [
            'src',
            'node_modules'
        ],
        extensions: ['', '.ts', '.tsx', '.js', '.jsx', '.json']
    },
    plugins: [
        new CleanPlugin([webpack_constants_1.BUILD_DIR], { root: webpack_constants_1.PROJECT_ROOT }),
        new ExtractTextPlugin('[name]-[chunkhash].css', { allChunks: true }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            },
            __BASENAME__: JSON.stringify(process.env.BASENAME || ''),
            __DEV__: false,
            __DEVTOOLS__: webpack_constants_1.DEVTOOLS
        }),
        new AssetsPlugin({
            filename: 'webpack.assets.json',
            path: "" + webpack_constants_1.BUILD_DIR,
            prettyPrint: true
        }),
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(false),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                unused: true,
                dead_code: true,
                warnings: false
            },
            comments: false
        })
    ]
};
webpackServerSideConfig['postcss'] = [
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
module.exports = webpackServerSideConfig;
