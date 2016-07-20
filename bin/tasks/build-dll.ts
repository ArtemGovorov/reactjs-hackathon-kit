import * as webpack from 'webpack';
import webpackCompilerDecorator from '../decorators/webpack-compiler';

const _debug = require('debug');
const debug = _debug('app:bin:tasks:build-dll');

export default function buildServerHMR() {

  const webpackConfig = require('../config/webpack.config.dll-client');
  const compiler = webpackCompilerDecorator(webpack(webpackConfig));

  return new Promise<webpack.compiler.Stats>(

    (resolve, reject) => {
      compiler.$run()
        .then(
        response => {
          debug(response.toShortSummaryString());
          resolve(response);
        }
        ).catch(
        error => {
          debug(error);
          reject(error);
        }
        );
    });

}

