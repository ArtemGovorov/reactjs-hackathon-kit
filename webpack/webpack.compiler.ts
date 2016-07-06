
import * as webpack from 'webpack';
const _debug = require('debug');




export default function webpackCompiler(webpackConfig, watch = false) {

  const debug = _debug('app:webpack:compiler');

  return new Promise((resolve, reject) => {
    const compiler = webpack(webpackConfig);

    const feedback = (err, stats) => {
      const jsonStats = stats.toJson();

      debug('Webpack compile completed for webpack config: ' + webpackConfig['name']);
      debug('\n\n' + stats.toString({
        chunks: true,
        chunkModules: false,
        colors: true,
        hash: true,
        version: true,
        timings: true
      }) + '\n');
      if (err) {
        debug('Webpack compiler encountered a fatal error.', err);
        console.log('Webpack compiler encountered a fatal error.', err);
        return reject(err);
      } else if (jsonStats.errors.length > 0) {
        debug('Webpack compiler encountered errors.');
        debug(jsonStats.errors.join('\n'));
        return reject(new Error('Webpack compiler encountered errors'));
      } else if (jsonStats.warnings.length > 0) {
        debug('Webpack compiler encountered warnings.');
        debug(jsonStats.warnings.join('\n'));
      } else {
        debug('No errors or warnings encountered.');
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