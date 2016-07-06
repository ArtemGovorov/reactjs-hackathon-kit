import * as _debug from 'debug';
import webpackCompiler from '../webpack/webpack.compiler';
import {resolve} from 'path';
import {argv} from 'yargs';
const compiler_fail_on_warning = false;
const debug = _debug('app:bin:compile');
const config = argv.config;
const watch = argv.watch;
const webpackConfig = require(resolve('./', config));
; (async function () {
  try {
    debug('Running compiler on ' + config );
    const stats = await webpackCompiler(webpackConfig, watch);
    if (stats['warnings'].length && compiler_fail_on_warning) {
      debug('Config set to fail on warning, exiting with status code "1".');
      process.exit(1);
    }
  } catch (e) {
    debug('Compiler encountered an error.', e);
  }
})();