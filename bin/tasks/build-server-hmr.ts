import * as webpack from 'webpack';
import webpackCompilerDecorator from '../decorators/webpack-compiler';
const webpackConfig = require('../config/webpack.config.dev-server');
const compiler = webpackCompilerDecorator(webpack(webpackConfig));
const _debug = require('debug');
const debug = _debug('app:bin:tasks:build-server-hmr');

export default function buildServerHMR() {

  return new Promise<webpack.compiler.Stats>((resolve, reject) => {

    compiler.$watch()
      .then(
      response => {
        debug(response.toShortSummaryString());
        startServer();
        resolve(response);
      }
      ).catch(
      error => {
        debug(error);
      }
      );

  });

}

function startServer() {

  const spawn = require('child_process').spawn;
  const env = Object.create(process.env);
  env.NODE_ENV = 'development';
  env.DEBUG = 'app:*';
  spawn(
    'node',
    ['./bin/server.js'],
    {
      env: env,
      stdio: 'inherit'
    }
  );

}