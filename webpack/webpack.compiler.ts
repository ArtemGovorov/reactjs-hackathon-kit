
import * as webpack from 'webpack';
const _debug = require('debug');

const debug = _debug('app:build:webpack-compiler');


export default function webpackCompiler(webpackConfig, watch = false) {
  return new Promise((resolve, reject) => {
    const compiler = webpack(webpackConfig);

    const feedback = (err, stats) => {
      const jsonStats = stats.toJson();

      debug('Webpack compile completed.');
      console.log('Webpack compile completed.');
      debug(stats.toString({
        chunks: false,
        chunkModules: false,
        colors: true
      }));
      console.log(stats.toString({
        chunks: false,
        chunkModules: false,
        colors: true
      }));
      if (err) {
        debug('Webpack compiler encountered a fatal error.', err);
        console.log('Webpack compiler encountered a fatal error.', err);
        return reject(err);
      } else if (jsonStats.errors.length > 0) {
        debug('Webpack compiler encountered errors.');
        debug(jsonStats.errors.join('\n'));
        console.log('Webpack compiler encountered errors.');
        console.log(jsonStats.errors.join('\n'));
        return reject(new Error('Webpack compiler encountered errors'));
      } else if (jsonStats.warnings.length > 0) {
        debug('Webpack compiler encountered warnings.');
        debug(jsonStats.warnings.join('\n'));
        console.log(jsonStats.errors.join('Webpack compiler encountered warnings.'));
        console.log(jsonStats.warnings.join('\n'));
      } else {
        debug('No errors or warnings encountered.');
        console.log('No errors or warnings encountered.');
      }
      resolve(jsonStats);
    };

    if (watch) {
      compiler.watch(
        {
          /** After a change the watcher waits that time (in milliseconds) for more changes. Default: 300. */
          aggregateTimeout: 1000,
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