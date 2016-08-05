import * as webpack from 'webpack';
import webpackCompiler from '../decorators/webpack-compiler';

import * as express from 'express';
import webpackStatsDecorator from '../decorators/webpack-stats';
import {
  PUBLIC_PATH,
  PORT
} from '../constants';


import _debug from '../decorators/debug';
const debug = _debug('app:bin:tasks:build-client-hmr', '🔥');


export default function () {

  const webpackConfig = require('../webpack/webpack.config.dev-client').default;
  const compiler = webpackCompiler(webpack(webpackConfig), true);


  return new Promise<webpack.compiler.Stats>(

    (resolve, reject) => {

      const devOptions = {
        quiet: true,
        noInfo: true,
        publicPath: `http://localhost:${PORT + 1}${PUBLIC_PATH}`,
        headers: { 'Access-Control-Allow-Origin': '*' }
      };

      const hotOptions = {
        log: str => { }
      };

      const app: express.Express = express();

      app.use(require('webpack-dev-middleware')(compiler, devOptions));
      app.use(require('webpack-hot-middleware')(compiler, hotOptions));

      app.listen((PORT + 1), function onAppListening(error) {
        if (error) {
          debug(error);
          reject(new Error(error));
        } else {
          debug(`hot reloading: http://localhost:${(PORT + 1)}`);
        }
      });

      (compiler as any).plugin('done', function (stats) {
        const customStats = webpackStatsDecorator(stats);
        resolve(customStats);
      });

    });

}