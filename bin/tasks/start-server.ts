import * as webpack from 'webpack';
import webpackCompiler from '../decorators/webpack-compiler';


export default function () {
  const webpackConfig = require('../webpack/webpack.config.prod-server').default;
  const compiler = webpackCompiler(webpack(webpackConfig));

  return new Promise<webpack.compiler.Stats>(
    (resolve, reject) => {
      compiler.$run()
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
  const args = ['./public/assets/server.js'];
  env.NODE_ENV = process.env.NODE_ENV;
  env.DEBUG = process.env.DEBUG;
  env.DEBUGGING = process.env.DEBUGGING;
  if (env.DEBUGGING === 'true') {
    args.unshift('--debug');
  }

  spawn(
    'node',
    args,
    {
      env: env,
      stdio: 'inherit'
    }
  );

}