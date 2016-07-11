'use strict';
var argv = require('yargs').argv;
var webpackConfig = require('./bin/config/webpack.config.test');
module.exports = function (config) {
    config.set({
        basePath: '',
        frameworks: ['mocha'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_INFO,
        autoWatch: true,
        autoWatchBatchDelay: 300,
        browsers: ['PhantomJS'],
        client: {
            mocha: {
            reporter: 'html', // change Karma's debug.html to the mocha web reporter
            ui: 'bdd',
            timeout: 15000
            }
        },
        singleRun: !argv.watch,
        files: [
            './node_modules/phantomjs-polyfill/bind-polyfill.js',
            {
                pattern: './src/karma.bundler.ts',
                watched: true,
                served: true,
                included: true
            }
        ],
        preprocessors: {
            'src/**/*.ts*': ['webpack', 'sourcemap'],
            'src/**/!(*.spec)+(.js)': ['coverage']
        },
        webpackMiddleware: {
            stats: {
                chunkModules: false,
                colors: true,
                quiet: false,
                noInfo: true
            }
        },
        webpack: webpackConfig,
        reporters: [
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
