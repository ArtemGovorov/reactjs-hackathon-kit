#!/usr/bin/env node
"use strict";

compile();
function compile() {
    var _debug = require('debug');
    var debug = _debug('app:bin:compile');
    var clear = require('clear');
    clear(true);
    clean()
        .then(function () {
        debug('⌨  compiling typescript...');
        var exec = require('child_process').exec;
        exec('tsc', function (error, stdout, stderr) {
            console.log('\n\n' + stdout);
        });
    });
    function clean() {
        var del = require('del');
        return new Promise(function (resolve, reject) {
            debug("🚿  cleaning...");
            var items = [
                'coverage/**',
                'reports/**',
                'public/**',
                'src/**/*.js',
                'src/**/*.js.map',
                'webpack/**/*.js',
                'webpack/**/*.js.map',
                'bin/**/*.js',
                'bin/**/*.js.map',
                'webpack-assets.json',
                'logs/**'
            ];
            items
                .map(function (toDelete) { return ({
                promise: del([toDelete]),
                toDelete: toDelete
            }); })
                .reduce(function (promise, currentDelete) {
                return promise
                    .then(function (response) {
                    return currentDelete.promise;
                })
                    .then(function (response) {
                    if (response.length > 0) {
                        debug('🚿  deleted:' + currentDelete.toDelete);
                    }
                })
                    .catch(function (error) {
                    reject(error);
                });
            }, Promise.resolve())
                .then(resolve);
        });
    }
}