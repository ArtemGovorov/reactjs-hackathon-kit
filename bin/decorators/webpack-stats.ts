import * as webpack from 'webpack';
import * as _debug from 'debug';

const debug = _debug('app:webpack:compiler');


interface CustomStats extends webpack.compiler.Stats {

}

export default (stats: webpack.compiler.Stats): CustomStats => {
  const decorated = stats as CustomStats;
  return decorated;
};