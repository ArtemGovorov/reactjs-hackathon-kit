#!/usr/bin/env node
import {PORT} from './constants';

compile();

function compile() {

  const _debug = require('debug');
  const debug = _debug('app:bin:terminate');
  const clear = require('clear');
  const kill = require('kill3k');

  clear(true);

  debug(`terminating ports ${PORT} and ${PORT + 1}`);
  kill(PORT);
  kill(PORT + 1);



  clean()
    .then(
    () => {
      debug('compiling typescript...');
      const exec = require('child_process').exec;
      exec('tsc',
        function (error, stdout, stderr) {
          console.log('\n\n' + stdout);
        });
    }
    );


  function clean() {

    const del = require('del');

    return new Promise<string>(

      (resolve, reject) => {
        debug(`cleaning`);
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
          .map(
          toDelete => ({
            promise: del([toDelete]),
            toDelete: toDelete
          }))
          .reduce(
          (promise: Promise<any>, currentDelete: { toDelete: string, promise: Promise<any> }) => {
            return promise
              .then(
              response => {
                return currentDelete.promise;
              }
              )
              .then(response => {
                if (response.length > 0) {
                  debug('deleted:' + currentDelete.toDelete);
                }
              })
              .catch(error => {
                reject(error);
              });
          },
          Promise.resolve()
          )
          .then(() => {
            setTimeout(function () {
              resolve();
            }, 200);
          });

      });

  }


}

