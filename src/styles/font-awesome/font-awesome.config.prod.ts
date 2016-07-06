const fontAwesomeConfig = require('./fonnt-awesome/font-awesome.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
fontAwesomeConfig.styleLoader = ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader');
export = fontAwesomeConfig;

