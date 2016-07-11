import * as _debug from 'debug';
import {resolve} from 'path';
import {argv} from 'yargs';
import * as webpack from 'webpack';
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');

const compiler_fail_on_warning = false;
const debug = _debug('app:bin:compile');
const config = argv.config;
const watch = argv.watch;
const webpackConfig = require(resolve('./', config));

webpackCompiler(webpackConfig, watch)

/*; (async function () {
  try {
    debug(`\n  ${watch ? '⏱' : '🏃'}  Running webpack ${watch ? 'watch ' : ''}compiler (${config})` );
    const stats = await webpackCompiler(webpackConfig, watch);
    if (stats['warnings'].length && compiler_fail_on_warning) {
      debug(`\n  ⚠️  Config set to fail on warning, exiting with status code "1"  (${config})`);
      process.exit(1);
    }
  } catch (e) {
    debug(`\n  ❌  Wepack compiler encountered an error (${config})`, e);
  }
})();*/


function webpackCompiler(webpackConfig, watch = false) {

  const debug = _debug('app:webpack:compiler');

  function addProgressBarPlugIn(config) {
    if (!config.plugins) {
      config.plugins = [];
    }
    config.plugins.push(new ProgressBarPlugin({
      clear: true,
      width: 60,
      format: '  building [:bar] ' + chalk.green.bold(':percent'),
    }));
  }

  if (!watch) {
    if (webpackConfig instanceof Array) {
      webpackConfig.forEach(config => {
        addProgressBarPlugIn(config);
      });
      webpackConfig.plugins = [];
    } else {
      addProgressBarPlugIn(webpackConfig);
    }
  }

  return new Promise((resolve, reject) => {
    const compiler = webpack(webpackConfig);


    const feedback = (err, stats) => {
      const jsonStats = stats.toJson();

      function preetfy(str) {
        return '  ' + str.replace(/\n/g, '\n    ');
      }

      debug('\n  ✅  Webpack compile completed for webpack config: ' + webpackConfig['name']);
      if (!watch) {
        debug('\n\n' + preetfy(stats.toString({
          chunks: false,
          chunkModules: false,
          colors: true,
          hash: true,
          version: true,
          timings: true
        })) + '\n');
      }
      if (err) {
        debug('\n  ☠️  Webpack compiler encountered a fatal error.: ' + webpackConfig['name'], err);
        return reject(err);
      } else if (jsonStats.errors.length > 0) {
        debug('\n  ❌  Webpack compiler encountered errors.: ' + webpackConfig['name']);
        debug(jsonStats.errors.join('\n'));
        return reject(new Error('Webpack compiler encountered errors: ' + webpackConfig['name']));
      } else if (jsonStats.warnings.length > 0) {
        debug('\n  ⚠️  Webpack compiler encountered warnings: ' + webpackConfig['name']);
        debug(jsonStats.warnings.join('\n'));
      } else {
        debug('\n  👍  No errors or warnings encountered: ' + webpackConfig['name']);
      }
      resolve(jsonStats);
    };

    if (watch) {
      compiler.watch(
        {
          /** After a change the watcher waits that time (in milliseconds) for more changes. Default: 300. */
          aggregateTimeout: 300,
          /** The watcher uses polling instead of native watchers.
           * true uses the default interval, a number specifies a interval in milliseconds.
           * Default: undefined (automatic). */
          poll: undefined
        },
        feedback
      );
    } else {
      compiler.run(feedback);
    }

  });
}