import * as webpack from 'webpack';
import webpackCompilerDecorator from '../decorators/webpack-compiler';
import * as express from 'express';
import {
  PUBLIC_PATH,
  PORT,
} from '../config/constants';
const webpackConfig = require('../config/webpack.config.dev-client');
const compiler = webpackCompilerDecorator(webpack(webpackConfig));
const _debug = require('debug');
const debug = _debug('app:bin:tasks:build-client-hmr');



export default function buildClientHMR() {

  return new Promise<webpack.compiler.Stats>((resolve, reject) => {

    const devOptions = {
      contentBase: 'http://' + 'localhost' + ':' + (PORT + 1),
      quiet: true,
      noInfo: true,
      hot: false,
      inline: false,
      overlay: true,
      lazy: false,
      publicPath: `http://localhost:${PORT + 1}${PUBLIC_PATH}`,
      headers: { 'Access-Control-Allow-Origin': '*' },
      stats: {
        colors: false
      }
    };

    const hotOptions = {
      //log: str => debug('\n  🔥  client ' + str),
      overlay: true,
      quiet: true,
      noInfo: true
    };

    const app: express.Express = express();

    app.use(require('webpack-dev-middleware')(compiler, devOptions));
    app.use(require('webpack-hot-middleware')(compiler, hotOptions));

    app.listen((PORT + 1), function onAppListening(err) {
        if (err) {
          debug(err);
        } else {
          debug(`\n  🔥  hot reloading: http://localhost:${(PORT + 1)}`);
        }
      });

    compiler.plugin('done', function (stats) {

      resolve(stats);

    });

  });

}