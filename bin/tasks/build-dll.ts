import * as webpack from 'webpack';
import webpackCompilerDecorator from '../decorators/webpack-compiler';


export default function buildServerHMR() {

  const webpackConfig = require('../config/webpack.config.dll-client');
  const compiler = webpackCompilerDecorator(webpack(webpackConfig));

  return new Promise<webpack.compiler.Stats>(

    (resolve, reject) => {
      compiler.$run()
        .then(
        response => {
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

