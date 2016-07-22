import * as webpack from 'webpack';
import webpackCompilerDecorator from '../decorators/webpack-compiler';


export default function () {
  const webpackConfig = require('../config/webpack.config.dev-server');
  const compiler = webpackCompilerDecorator(webpack(webpackConfig));

  return new Promise<webpack.compiler.Stats>(
    (resolve, reject) => {
      compiler.$watch()
        .then(
        response => {
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