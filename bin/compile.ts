import * as _debug from 'debug';
import {resolve} from 'path';
import {argv} from 'yargs';
import * as webpack from 'webpack';
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');


const config = argv.config;
const watch = argv.watch;
const webpackConfig = require(resolve('./', config));

//REMOVE THIS WHEN TYPESCRIPT 2.1 SUPPORTS AWAIT > ES5
webpackCompiler(webpackConfig, watch);

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



function webpackCompiler(webpackConfig, watch = false) {

  const debug = _debug('app:webpack:compiler');

  function addProgressBarPlugIn(config) {
    if (!config.plugins) {
      config.plugins = [];
    }
    config.plugins.push(new ProgressBarPlugin({
      clear: true,
      width: 50,
      summary: false,
      incomplete: '👎',
      complete: '👍',
      customSummary: () => { },
      format: '  [:bar] ' + chalk.green.bold(':percent'),
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

    (compiler as any).plugin('compile', function () {
      debug('\n  🛠  ' + webpackConfig.name + ' webpack building...');
    });


    const feedback = (err, statsResult) => {
      const jsonStats = statsResult.toJson();

      function preetfy(str) {
        return '  ' + str.replace(/\n/g, '\n    ');
      }
      if (watch) {
        //for multi-compiler, stats will be an object with a 'children' array of stats
        let bundles = extractBundles(statsResult);
        bundles.forEach(function (stats) {
          //console.log(stats);
          stats.time = stats.endTime - stats.startTime;
          debug('\n  🛠  ' + webpackConfig.name + ' webpack built ' + (stats.name ? stats.name + ' ' : '') +
            stats.hash + ' in ' + stats.time + 'ms');

          /*        eventStream.publish({
                    name: stats.name,
                    action: 'built',
                    time: stats.time,
                    hash: stats.hash,
                    warnings: stats.warnings || [],
                    errors: stats.errors || [],
                    modules: buildModuleMap(stats.modules)
                  });*/
        });
      }
      if (watch) {
        /*        debug('\n\n' + preetfy(stats.toString({
                  chunks: false,
                  chunkModules: false,
                  colors: true,
                  hash: true,
                  version: true,
                  timings: true
                })) + '\n');*/
      }
      if (err) {
        debug('\n  ☠️  webpack compiler encountered a fatal error.: ' + webpackConfig['name'], err);
        return reject(err);
      } else if (jsonStats.errors.length > 0) {
        debug('\n  ❌  webpack compiler encountered errors.: ' + webpackConfig['name']);
        debug(jsonStats.errors.join('\n'));
        return reject(new Error('Webpack compiler encountered errors: ' + webpackConfig['name']));
      } else if (jsonStats.warnings.length > 0 && !watch) {
        debug('\n  ⚠️  webpack compiler encountered warnings: ' + webpackConfig['name']);
        debug(jsonStats.warnings.join('\n'));
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

function extractBundles(stats) {
  // Stats has modules, single bundle
  if (stats.modules) { return [stats]; }

  // Stats has children, multiple bundles
  if (stats.children && stats.children.length) { return stats.children; }

  // Not sure, assume single
  return [stats];
}


function buildModuleMap(modules) {
  const map = {};
  modules.forEach(function (module) {
    map[module.id] = module.name;
  });
  return map;
}