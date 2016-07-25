import * as webpack from 'webpack';
import _debug from './debug';
import webpackStatsDecorator from './webpack-stats';
import {compose} from 'ramda';
const debug = _debug('app:bin:decorators:webpack-compiler', '🛠');

let _compiler: CustomCompiler;
let _name: string;
let _target: string;
let _isDLL: boolean;

import {CustomStats} from './webpack-stats';

export interface CustomCompiler extends webpack.compiler.Compiler {
  $watch: () => Promise<CustomStats>;
  $run: () => Promise<CustomStats>;
}

//(compiler: webpack.compiler.Compiler) => Promise<any>;
export default (compiler: webpack.compiler.Compiler,
  isDLL: boolean = false
): CustomCompiler => {
  _isDLL = isDLL;
  _compiler = compiler as CustomCompiler;
  _compiler.$watch = $watch;
  _compiler.$run = $run;
  _name = _compiler.name;
  if (!compiler.options.target) {
    throw new Error('Target option must be set to web or node.');
  } else {
    _target = _compiler.options.target;
  }

  return _compiler;
};

function $watch(): Promise<CustomStats> {
  return new Promise<CustomStats>(
    (resolve, reject) => {
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
      (_compiler as any).plugin('compile', function (stats) {
        compilingMessage(stats);
      });
      (_compiler as any).plugin('invalid', invalidPlugin);
      (_compiler as any).plugin('watch-run', invalidAsyncPlugin);
      (_compiler as any).plugin('run', invalidAsyncPlugin);
      (_compiler as any).plugin('done', function (stats) {
        state = true;
        process.nextTick(function () {
          if (!state) { return; }
          compose(
            modulesCheckMessage,
            compiledMessage,
            builtMessage
          )(stats);
        });
      });
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
      (_compiler as any).plugin('compile', function (stats) {
        compilingMessage(stats);
      });
      (_compiler as any).plugin('done', function (stats) {
        compose(
          compiledMessage,
          builtMessage
        )(stats);
      });
      _compiler.run(
        compileCallback(resolve, reject)
      );
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
      return reject(err);
    } else if (stats.hasErrors()) {
      return reject(jsonStats.errors);
    } else if (stats.hasWarnings()) {
      return reject(jsonStats.warnings);
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

function builtMessage(stats): webpack.compiler.Stats {
  debug(`${debugPrefix(_name)}built in ${stats.endTime - stats.startTime} ms`);
  return stats;
}

function compiledMessage(stats): webpack.compiler.Stats {
  const customStats: CustomStats = webpackStatsDecorator(stats);
  debug(`${debugPrefix(_name)}compiled these files...`, '\n' + customStats.toBuiltString());
  return stats;
}

function modulesCheckMessage(stats: webpack.compiler.Stats): webpack.compiler.Stats {
  const customStats: CustomStats = webpackStatsDecorator(stats);
  const builtNodeModules = customStats.builtNodeModules();
  if (builtNodeModules.length > 0) {
    let message = '';
    if (_isDLL) {
      message = '\nBundle these modules into your DLL instead...';
    } else if (_name === 'server') {
      message = '\nConfigure these modules into your externals instead...';
    }
    debug(
      `${debugPrefix(_name)}WARNING node modules are slowing down this build!!!`,
      message,
      '\n' + builtNodeModules.join('\n'));
  }
  return stats;
}



