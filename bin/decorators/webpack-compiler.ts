import * as webpack from 'webpack';
import _debug from './debug';
import webpackStatsDecorator from './webpack-stats';
const debug = _debug('app:bin:decorators:webpack-compiler', '🛠');



import {CustomStats} from './webpack-stats';

export interface CustomCompiler extends webpack.compiler.Compiler {
  $watch: () => Promise<CustomStats>;
  $run: () => Promise<CustomStats>;
}

//(compiler: webpack.compiler.Compiler) => Promise<any>;
export default (compiler: webpack.compiler.Compiler): CustomCompiler => {

  const customCompiler: CustomCompiler = compiler as CustomCompiler;
  customCompiler.$watch = watchPromise(compiler, compileCallback);
  customCompiler.$run = runPromise(compiler, compileCallback);


  const name = compiler.name;
  let compileStart;

  (compiler as any).plugin('compile', function (response) {
    debug(`${name ? name + ' ' : ''}webpack building...`);
    compileStart = Date.now();
  });

  (compiler as any).plugin('done', function (stats: CustomStats) {
    debug(`${name ? name + ' ' : ''}webpack built in ${stats.endTime - stats.startTime} ms`);
  });

  return customCompiler;
};

function watchPromise(
  compiler: webpack.compiler.Compiler,
  compileCallback: any
) {
  return (): Promise<CustomStats> =>
    new Promise<CustomStats>(
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
        (compiler as any).plugin('invalid', invalidPlugin);
        (compiler as any).plugin('watch-run', invalidAsyncPlugin);
        (compiler as any).plugin('run', invalidAsyncPlugin);
        (compiler as any).plugin('done', function (stats) {
          state = true;
          process.nextTick(function () {
            // check if still in valid state
            if (!state) { return; }
            // print webpack output
            const customStats: CustomStats = webpackStatsDecorator(stats);
            debug('Compiled files', '\n' + customStats.toBuiltString());
            const builtNodeModules = customStats.builtNodeModules();
            if (builtNodeModules.length > 0) {
              debug(
                'WARNING: node modules are slowing down this build!!!',
                '\nBundle these modules into your DLL instead...',
                '\n' + builtNodeModules.join('\n'));
            }
          });
        });
        compiler.watch(
          {
            aggregateTimeout: 300,
            poll: undefined
          },
          compileCallback(resolve, reject)
        );
      });

}

function runPromise(
  compiler: webpack.compiler.Compiler,
  compileCallback: any
) {
  return (): Promise<CustomStats> =>
    new Promise<CustomStats>(
      (resolve, reject) => {
        compiler.run(
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



