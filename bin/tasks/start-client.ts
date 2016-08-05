import * as webpack from 'webpack';
import webpackCompiler from '../decorators/webpack-compiler';


export default function () {
  const webpackConfig = require('../webpack/webpack.config.prod-client').default;
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
        }
        );

    });

}
