import * as webpack from 'webpack';
import _debug from './debug';
import webpackStatsDecorator from './webpack-stats';
import { compose } from 'ramda';
import {
  NAME_SERVER,
  NAME_CLIENT
} from '../constants';

const debug = _debug('app:bin:decorators:webpack-compiler', '🛠');
const chalk = require('chalk');
const notifier = require('node-notifier');

import { CustomStats } from './webpack-stats';


export interface CustomCompiler extends webpack.compiler.Compiler {
  $watch: () => Promise<CustomStats>;
  $run: () => Promise<CustomStats>;
}

export default (compiler: webpack.compiler.Compiler, isHMR: boolean = false): CustomCompiler => {
  return compilerFactory(compiler, isHMR) as CustomCompiler;
};

export function compilerHMR(compiler: webpack.compiler.Compiler): webpack.compiler.Compiler {
  return compilerFactory(compiler, true);
};

function compilerFactory(compiler, isHMR) {
  const _compiler = compiler;
  const _name = _compiler.name;

  if (isHMR) {

    addWatchListeners(compiler);
    return compiler;

  } else {
    return {

      $watch: $watch,
      $run: $run

    };

  }


  function $watch(): Promise<CustomStats> {
    return new Promise<CustomStats>(
      (resolve, reject) => {
        addWatchListeners(_compiler);
        _compiler.watch(
          {
            aggregateTimeout: 300,
            poll: undefined
          },
          compileCallback(resolve, reject)
        );
      });
  }

  function $run(): Promise<CustomStats> {
    return new Promise<CustomStats>(
      (resolve, reject) => {
        addRunListeners(_compiler);
        _compiler.run(
          compileCallback(resolve, reject)
        );
      });
  }

  function addWatchListeners(compiler) {
    // the state, false: bundle invalid, true: bundle valid
    let state = false;
    // on compiling
    function invalidPlugin() {
      state = false;
    }
    function invalidAsyncPlugin(compiler, callback) {
      invalidPlugin();
      callback();
    }

    (compiler as any).plugin('compile', function (stats) {
      compilingMessage(stats);
    });
    (compiler as any).plugin('invalid', invalidPlugin);
    (compiler as any).plugin('watch-run', invalidAsyncPlugin);
    (compiler as any).plugin('run', invalidAsyncPlugin);
    (compiler as any).plugin('done', function (stats) {
      state = true;
      process.nextTick(function () {
        if (!state) { return; }
        compose(
          modulesCheckMessage,
          compiledMessage
        )(stats);
      });
    });
  }

  function addRunListeners(compiler) {
    (compiler as any).plugin('compile', function (stats) {
      compilingMessage(stats);
    });
    (compiler as any).plugin('done', function (stats) {
      compose(
        compiledMessage
      )(stats);
    });
  }



  function compileCallback(resolve, reject) {
    return (
      err: Error,
      stats: webpack.compiler.Stats
    ) => {
      const customStats: CustomStats = webpackStatsDecorator(stats);
      const jsonStats = stats.toJson();
      if (err) {
        debug(chalk.red(`${debugPrefix(_name)}COMPILE ERRORS...`));
        debug(err);
        notifier.notify({
          title: 'Webpack compile errors!',
          message: err,
        });
        return reject(err);
      } else if (stats.hasErrors()) {
        debug(chalk.red(`${debugPrefix(_name)}COMPILE ERRORS...`));
        debug(jsonStats.errors);
        notifier.notify({
          title: 'Webpack compile errors!',
          message: jsonStats.errors,
        });
        return reject(new Error(jsonStats.errors));
      } else if (stats.hasWarnings()) {
        debug(chalk.yellow(`${debugPrefix(_name)}COMPILE WARNINGS...`));
        debug(jsonStats.warnings);
        return reject(new Error(jsonStats.warnings));
      }
      resolve(customStats);
    };
  }

  function debugPrefix(name) {
    return `webpack:${_name ? _name : ''}\n`;
  }

  function compilingMessage(stats): webpack.compiler.Stats {
    debug(`${debugPrefix(_name)}building...`);
    return stats;
  }

  function compiledMessage(stats): webpack.compiler.Stats {
    const customStats: CustomStats = webpackStatsDecorator(stats);
    debug(`${debugPrefix(_name) + customStats.toShortSummaryString()}`);
    debug(`${debugPrefix(_name)}compiled these files...`, '\n' + customStats.toBuiltString());
    return stats;
  }

  function modulesCheckMessage(stats: webpack.compiler.Stats): webpack.compiler.Stats {
    const customStats: CustomStats = webpackStatsDecorator(stats);
    const builtNodeModules = customStats.builtNodeModules();
    if (builtNodeModules.length > 0) {
      let message = '';
      if (_name === NAME_CLIENT) {
        message = '\nBundle these modules into your DLL instead...';
      } else if (_name === NAME_SERVER) {
        message = '\nConfigure these modules into your externals instead...';
      }
      debug(
        chalk.yellow(`${debugPrefix(_name)}WARNING node modules are slowing down this build!!!`),
        message,
        '\n' + builtNodeModules.join('\n'));
    }
    return stats;
  }


}



