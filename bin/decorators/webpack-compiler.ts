
import * as webpack from 'webpack';
import * as _debug from 'debug';
import webpackStatsDecorator from './webpack-stats';
const debug = _debug('app:webpack:compiler');

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
    debug(`\n  🛠  ${name ? name + ' ' : ''}webpack building...`);
    compileStart = Date.now();
  });

  (compiler as any).plugin('done', function (stats: CustomStats) {
    debug(`\n  🛠  ${name ? name + ' ' : ''}webpack built in ${stats.endTime - stats.startTime} ms`);
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



