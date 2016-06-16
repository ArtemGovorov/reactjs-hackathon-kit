'use strict';

var wallabyWebpack = require('wallaby-webpack');
var config = require('./config/webpack.test.js')


config.module.loaders = config.module.loaders.filter(function (l) {
    return l.loader !== 'ts-loader'
})

// tests + specHelper will be webpack-ed entry points
config.entryPatterns = ['tests/**/*.spec.js*', 'src/shared/polyfill.js', 'tests/karma.bundler.js'];

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
            // PhantomJs Function.bind polyfill
            { pattern: 'node_modules/phantomjs-polyfill/bind-polyfill.js', instrument: false },
            { pattern: 'tests/karma.bundler.ts', load: false },
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
        setup: function () {
            global.React = require("react");

            // Taken from https://github.com/airbnb/enzyme/blob/master/docs/guides/jsdom.md
            var jsdom = require('jsdom').jsdom;

            var exposedProperties = ['window', 'navigator', 'document'];

            global.document = jsdom('');
            global.window = document.defaultView;
            Object.keys(document.defaultView).forEach((property) => {
                if (typeof global[property] === 'undefined') {
                    exposedProperties.push(property);
                    global[property] = document.defaultView[property];
                }
            });

        },
        bootstrap: function () {

            window.__moduleBundler.loadTests();

        }
    };
};