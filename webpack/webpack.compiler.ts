
import * as webpack from 'webpack';
const _debug = require('debug');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');



export default function webpackCompiler(webpackConfig, watch = false) {

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
          aggregateTimeout: 0,
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