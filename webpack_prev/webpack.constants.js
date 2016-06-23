"use strict";
var path = require('path');
exports.HOST = process.env.HOST || 'localhost';
exports.PORT = process.env.PORT || 8080;
exports.BUILD_DIR = path.resolve(__dirname, '..', 'public');
exports.APP_DIR = path.resolve(__dirname, '..', 'src');
exports.PROJECT_ROOT = path.resolve(__dirname, '..');
exports.DEV = process.env.NODE_ENV === 'development';
exports.PROD = process.env.NODE_ENV === 'production';
exports.TEST = process.env.NODE_ENV === 'test';
exports.BASENAME = JSON.stringify(process.env.BASENAME || '');
exports.DEVTOOLS = false;
//# sourceMappingURL=webpack.constants.js.map