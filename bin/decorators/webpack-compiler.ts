import * as webpack from 'webpack';
import _debug from './debug';
import webpackStatsDecorator from './webpack-stats';
const debug = _debug('app:bin:decorators:webpack-compiler', '🛠');

let _compiler: CustomCompiler;
let _name: string;

import {CustomStats} from './webpack-stats';

export interface CustomCompiler extends webpack.compiler.Compiler {
  $watch: () => Promise<CustomStats>;
  $run: () => Promise<CustomStats>;
}

//(compiler: webpack.compiler.Compiler) => Promise<any>;
export default (compiler: webpack.compiler.Compiler): CustomCompiler => {

  _compiler = compiler as CustomCompiler;
  _compiler.$watch = $watch;
  _compiler.$run = $run;
  _name = _compiler.name;
  let compileStart;
  (_compiler as any).plugin('compile', function (response) {
    debug(`${debugPrefix(_name)}building...`);
    compileStart = Date.now();
  });
  (_compiler as any).plugin('done', function (stats: CustomStats) {
    debug(`${debugPrefix(_name)}built in ${stats.endTime - stats.startTime} ms`);
  });

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
      (_compiler as any).plugin('invalid', invalidPlugin);
      (_compiler as any).plugin('watch-run', invalidAsyncPlugin);
      (_compiler as any).plugin('run', invalidAsyncPlugin);
      (_compiler as any).plugin('done', function (stats) {
        state = true;
        process.nextTick(function () {
          // check if still in valid state
          if (!state) { return; }
          // print webpack output
          const customStats: CustomStats = webpackStatsDecorator(stats);
          debug('Compiled files', '\n' + customStats.toBuiltString());
          const builtNodeModules = customStats.builtNodeModules();
          if (builtNodeModules.length > 0) {
            let message = '';
            if (_name === 'client') {
              message = '\nBundle these modules into your DLL instead...';
            } else if (_name === 'server') {
              message = '\nConfigure these modules into your externals instead...';
            }
            debug(
              `${debugPrefix(_name)}WARNING node modules are slowing down this build!!!`,
              message,
              '\n' + builtNodeModules.join('\n'));
          }
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



