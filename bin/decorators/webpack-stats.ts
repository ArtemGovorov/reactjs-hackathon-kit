import * as webpack from 'webpack';


export interface CustomStats extends webpack.compiler.Stats {
  toSummaryString: () => string;
  toShortSummaryString: () => string;
  startTime: number;
  endTime: number;
  hash: string;
}

export default (stats: webpack.compiler.Stats): CustomStats => {
  const decorated = stats as CustomStats;
  decorated.toSummaryString = formatStats(stats, {
    chunks: true,
    chunkModules: true,
    colors: true,
    hash: true,
    version: true,
    timings: true
  });
  decorated.toShortSummaryString = formatStats(stats, {
    chunks: false,
    chunkModules: false,
    colors: true,
    hash: true,
    version: true,
    timings: true
  });
  return decorated;
};

function formatStats(
  stats: webpack.compiler.Stats,
  printOptions: any
) {
  return (): string => {
    let str: string = '';
    let bundles = extractBundles(stats);
    bundles.forEach(function (stats) {
      str += stats.toString(printOptions);
    });
    return str;
  };
}

function extractBundles(stats) {
  // Stats has modules, single bundle
  if (stats.modules) { return [stats]; }
  // Stats has children, multiple bundles
  if (stats.children && stats.children.length) { return stats.children; }
  // Not sure, assume single
  return [stats];
}