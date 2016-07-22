import _debug from '../decorators/debug';
const debug = _debug('app:tasks:clean', '🚿');
import * as del from 'del';


export default function () {


  return new Promise<string>(

    (resolve, reject) => {
      debug(`Scrub a dub dub`);
      const items = [
        'coverage/**',
        'reports/**',
        'public/**',
        'src/**/*.js',
        'src/**/*.js.map',
        'webpack/**/*.js',
        'webpack/**/*.js.map',
        'bin/**/*.js',
        'bin/**/*.js.map',
        'webpack-assets.json',
        'logs/**'
      ];

      items
        .map(
        toDelete => ({
          promise: del([toDelete]),
          toDelete: toDelete
        }))
        .reduce(
        (promise: Promise<any>, currentDelete: { toDelete: string, promise: Promise<any> }) => {
          return promise
            .then(
            response => {
              return currentDelete.promise;
            }
            )
            .then(response => {
              if (response.length > 0) {
                debug('deleted:' + currentDelete.toDelete);
              }
            })
            .catch(error => {
              reject(error);
            });
        },
        Promise.resolve()
        )
        .then(() => {
          setTimeout(function () {
            resolve();
          }, 200);
        });

    });

}

