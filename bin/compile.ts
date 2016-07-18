
import webpackCompiler from './webpack-compiler';
import {resolve} from 'path';
import * as _debug from 'debug';
import * as webpack from 'webpack';
const debug = _debug('app:test');

//./bin/config/webpack.config.dev-server.js

webpackCompiler(
  require(resolve('./', './bin/config/webpack.config.dev-server.js')),
  false
)
  .then(response => {
    debugResponse(response);
  })

  .catch(error => {
    debug(`\n  ❌  Wepack compiler encountered an error`, error);
  });

function debugResponse(stats: webpack.compiler.Stats) {

  if (stats.hasWarnings()) {
    const jsonStats = stats.toJson();
    debug('\n  ⚠️  Webpack compiler encountered warnings.');
    debug('\n  ⚠️  ' + jsonStats.warnings.join('\n'));
  }

}