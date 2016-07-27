const bootstrapConfig = require('./bootstrap/bootstrap.config');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
bootstrapConfig.styleLoader = ExtractTextPlugin.extract('style-loader', 'css-loader!sass-loader');
export default  bootstrapConfig;

