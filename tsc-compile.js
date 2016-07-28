#!/usr/bin/env node
"use strict";
compile();
function compile() {
  const _debug = require('debug');
  const debug = _debug('app:bin:terminate');
  const clear = require('clear');
  const kill = require('kill3k');
  clear(true);
  clean()
    .then(() => {
      debug('⌨  compiling typescript...');
      const exec = require('child_process').exec;
      exec('tsc', function (error, stdout, stderr) {
        console.log('\n\n' + stdout);
      });
    });
  function clean() {
    const del = require('del');
    return new Promise((resolve, reject) => {
      debug("🚿  cleaning...");
      const items = [
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
        .map(toDelete => ({
          promise: del([toDelete]),
          toDelete: toDelete
        }))
        .reduce((promise, currentDelete) => {
          return promise
            .then(response => {
              return currentDelete.promise;
            })
            .then(response => {
              if (response.length > 0) {
                debug('deleted:' + currentDelete.toDelete);
              }
            })
            .catch(error => {
              reject(error);
            });
        }, Promise.resolve())
        .then(() => {
          setTimeout(function () {
            resolve();
          }, 200);
        });
    });
  }
}