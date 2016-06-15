'use strict';

var webpackConfig = require('./config/webpack.test');
require('phantomjs-polyfill')
webpackConfig.entry = {};

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['mocha', 'sinon'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    autoWatchBatchDelay: 300,
    browsers: ['Chrome'],
    singleRun: false,//!argv.watch,
    files: [
      './node_modules/phantomjs-polyfill/bind-polyfill.js',
      './tests/karma.bundler.ts'
    ],
    babelPreprocessor: {
      options: {
        presets: ['es2015']
      }
    },
    preprocessors: {
      'tests/karma.bundler.ts': ['webpack'],
      'src/**/!(*.spec)+(.js)': ['coverage']
    },
    webpackMiddleware: {
      stats: {
        chunkModules: false,
        colors: true
      }
    },
    webpack: webpackConfig,
    reporters: [
      'dots',
      'spec',
      'coverage',
      'mocha'
    ],
    coverageReporter: {
      reporters: [
        { type: 'text-summary' },
        { type: 'lcov', dir: 'coverage' },
        {
          dir: 'reports/coverage/',
          subdir: '.',
          type: 'html'
        }, {
          dir: 'reports/coverage/',
          subdir: '.',
          type: 'cobertura'
        }, {
          dir: 'reports/coverage/',
          subdir: '.',
          type: 'json'
        }
      ]
    }
  });
};



