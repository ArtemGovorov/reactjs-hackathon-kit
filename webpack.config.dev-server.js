"use strict";
var webpack = require('webpack');
var CleanPlugin = require('clean-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var AssetsPlugin = require('assets-webpack-plugin');
var assetsPluginInstance = new AssetsPlugin({ prettyPrint: true, filename: 'webpack-assets-server.json' });
var webpack_constants_1 = require('./webpack.constants');
var webpackConfig = {
    context: webpack_constants_1.SRC_DIR,
    entry: {
        server: [
            ("bootstrap-sass!" + webpack_constants_1.SRC_DIR + "/theme/bootstrap.config.prod.js"),
            ("font-awesome-webpack!" + webpack_constants_1.SRC_DIR + "/theme/font-awesome.config.prod.js"),
            (webpack_constants_1.SRC_DIR + "/server")
        ]
    },
    target: 'node',
    output: {
        path: webpack_constants_1.ASSETS_DIR,
        filename: 'server.js',
        publicPath: webpack_constants_1.PUBLIC_PATH,
        libraryTarget: 'commonjs2'
    },
    module: {
        loaders: webpack_constants_1.LOADERS_COMMON
            .concat(webpack_constants_1.LOADERS_STYLES_PROD)
    },
    resolve: {
        root: [webpack_constants_1.SRC_DIR],
        extensions: ['', '.js'],
    },
    devtool: 'sourcemap',
    plugins: [
        new CleanPlugin([webpack_constants_1.BUILD_DIR], { root: webpack_constants_1.PROJECT_ROOT }),
        new ExtractTextPlugin('styles/main.css', {
            allChunks: true
        }),
        new webpack.BannerPlugin('require("source-map-support").install();', { raw: true, entryOnly: false }),
        new webpack.DefinePlugin({
            __CLIENT__: false,
            __DEVCLIENT__: false,
            __DEVSERVER__: true,
            __BASENAME__: webpack_constants_1.BASENAME,
            __DEVTOOLS__: false
        }),
        assetsPluginInstance
    ]
};
webpackConfig['name'] = 'server-side rendering';
webpackConfig['externals'] = webpack_constants_1.EXTERNALS;
module.exports = webpackConfig;
//# sourceMappingURL=webpack.config.dev-server.js.map