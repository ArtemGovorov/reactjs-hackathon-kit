import * as webpack from 'webpack';
import webpackCompilerDecorator from '../decorators/webpack-compiler';


export default function () {

  const webpackConfig = require('../config/webpack.config.dll-client');
  const compiler = webpackCompilerDecorator(webpack(webpackConfig), true);

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

