import * as _debug from 'debug';
import * as webpack from 'webpack';
import webpackCompilerDecorator from './decorators/webpack-compiler';
import webpackStatsDecorator from './decorators/webpack-stats';
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');



function addProgressBarPlugIn(config) {
  if (!config.plugins) {
    config.plugins = [];
  }
  config.plugins.push(new ProgressBarPlugin({
    clear: true,
    width: 30,
    summary: false,
    incomplete: '😬 ',
    complete: '😜 ',
    customSummary: () => { },
    format: '  [:bar] ' + chalk.green.bold(':percent'),
  }));
}

export default function webpackCompiler(webpackConfig, watch = false) {

  const debug = _debug('app:webpack:compiler');

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
  function preetfy(str) {
    return '  ' + str.replace(/\n/g, '\n    ');
  }
  return new Promise<webpack.compiler.Stats>((resolve, reject) => {


    const compiler = webpackCompilerDecorator(webpack(webpackConfig));

    const feedback = (
      err: Error,
      stats: webpack.compiler.Stats
    ) => {
      const customStats = webpackStatsDecorator(stats);

      const jsonStats = stats.toJson();


      if (1 === 1) {
        //for multi-compiler, stats will be an object with a 'children' array of stats
        let bundles = extractBundles(customStats);

        bundles.forEach(function (stats) {
          //console.log(stats);
          stats.time = stats.endTime - stats.startTime;
          debug('\n  🛠  ' + webpackConfig.name + ' webpack built ' + (stats.name ? stats.name + ' ' : '') +
            stats.hash + ' in ' + stats.time + 'ms');

          debug('\n\n tits' + preetfy(stats.toString({
            chunks: true,
            chunkModules: true,
            colors: true,
            hash: true,
            version: true,
            timings: true
          })) + '\n');

        });
      }

      if (err) {
        return reject(err);
      } else if (stats.hasErrors()) {
        return reject(
          new Error(
            `Webpack compiler encountered errors: ${jsonStats.errors.join('\n')}`
          )
        );
      }
      resolve(stats);
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

function extractBundles(stats) {
  // Stats has modules, single bundle
  if (stats.modules) { return [stats]; }

  // Stats has children, multiple bundles
  if (stats.children && stats.children.length) { return stats.children; }

  // Not sure, assume single
  return [stats];
}



/*
UNCOMMENT THIS WHEN TYPESCRIPT 2.1 SUPPORTS AWAIT > ES5
const compiler_fail_on_warning = false;
const debug = _debug('app:bin:compile');

; (async function () {
  try {
    debug(`\n  ${watch ? '⏱' : '🛠'}  Running webpack ${watch ? 'watch ' : ''}compiler (${config})` );
    const stats = await webpackCompiler(webpackConfig, watch);
    if (stats['warnings'].length && compiler_fail_on_warning) {
      debug(`\n  ⚠️  Config set to fail on warning, exiting with status code "1"  (${config})`);
      process.exit(1);
    }
  } catch (e) {
    debug(`\n  ❌  Wepack compiler encountered an error (${config})`, e);
  }
})();*/
