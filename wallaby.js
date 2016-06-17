'use strict';

var wallabyWebpack = require('wallaby-webpack');
var config = require('./config/webpack.test.js')


config.module.loaders = config.module.loaders.filter(function (l) {
    return l.loader !== 'ts-loader'
})

// tests + specHelper will be webpack-ed entry points
config.entryPatterns = ['tests/**/*.spec.js*', 'src/shared/polyfill.js', 'tests/spec-helper.js'];

config.resolve = {

    extensions: ['', '.js', '.json'],
    alias: {
        sinon: 'sinon/pkg/sinon.js'
    }
}


var webpackPostprocessor = wallabyWebpack(config)




module.exports = function (wallaby) {


    return {
        debug: true,
        files: [
            { pattern: 'tests/spec-helper.ts', load: false },
            { pattern: 'src/shared/polyfill.ts', instrument: false },
            { pattern: 'src/**/*.ts*', load: false },
            { pattern: 'src/**/*.scss', load: false },
            { pattern: 'src/**/*.jpg', load: false }
        ],
        tests: [
            { pattern: 'tests/**/*.spec.ts*', load: false },
        ],



        postprocessor: webpackPostprocessor,

        testFramework: "mocha",

        bootstrap: function () {

            window.__moduleBundler.loadTests();

        }
    };
};