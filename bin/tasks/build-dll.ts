import * as webpack from 'webpack';
import webpackCompiler from '../decorators/webpack-compiler';


export default function () {

  const webpackConfig = require('../config/webpack.config.dll-client');
  const compiler = webpackCompiler(webpack(webpackConfig));

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

