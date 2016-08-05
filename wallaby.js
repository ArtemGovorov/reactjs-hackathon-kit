'use strict';
var wallabyWebpack = require('wallaby-webpack');

var Module = require('module').Module;
var modulePrototype = Module.prototype;
var originalRequire = modulePrototype.require;
modulePrototype.require = function (filePath) {
  if (filePath === 'source-map-support') {
    return {install: () => {}};
  }
  return originalRequire.call(this, filePath);
};

var config = require('./bin/webpack/webpack.config.test').default;

modulePrototype.require = originalRequire;

var TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;

process.env.NODE_ENV = 'test';





config.module.loaders = config.module.loaders.filter(
    function (l) {
        return l.loader !== 'awesome-typescript-loader?useBabel=true'
    }
)

// tests + specHelper will be webpack-ed entry points
config.entryPatterns = ['src/**/*.spec.js*', 'src/polyfill.js', 'src/spec-helper.js'];

config.resolve = {

    extensions: ['', '.js', '.json', '.css'],
    alias: {
        sinon: 'sinon/pkg/sinon.js'
    },

    modules: ['node_modules', 'src']
}


var webpackPostprocessor = wallabyWebpack(config)




module.exports = function (wallaby) {


    return {
        debug: true,
        files: [
            { pattern: 'src/spec-helper.ts', load: false },
            { pattern: 'src/polyfill.ts', instrument: false },
            { pattern: 'src/**/*.ts*', load: false },
            { pattern: 'src/**/*.css', load: false },
            { pattern: 'src/**/*.jpg', load: false },
            { pattern: 'src/**/*.spec.ts*', ignore: true },
        ],
        tests: [
            { pattern: 'src/**/*.spec.ts*', load: false },
        ],

        compilers: {
            'src/**/*.ts?(x)': wallaby.compilers.typeScript({
                target: 'es5'
            })
        },


        postprocessor: webpackPostprocessor,

        testFramework: "mocha",

        bootstrap: function () {

            window.__moduleBundler.loadTests();

        }
    };
};
