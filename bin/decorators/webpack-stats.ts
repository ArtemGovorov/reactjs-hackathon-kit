import * as webpack from 'webpack';


export interface CustomStats extends webpack.compiler.Stats {
  toSummaryString: () => string;
  toShortSummaryString: () => string;
  toBuiltString: () => string;
  startTime: number;
  endTime: number;
  hash: string;
  compilation: {
    modules: [
      {
        assets: [any];
        built: boolean;
        buildTimestamp: number;
        cacheable: boolean;
        warnings: [any];
        rawRequest: string;
        request: string;
        resource: string;
        errors: [any];
        size: number;
      }
    ];
  };
}

export default (stats: webpack.compiler.Stats): CustomStats => {
  const decorated = stats as CustomStats;
  decorated.toSummaryString = formatStats(
    decorated,
    {
      chunks: true,
      chunkModules: true,
      colors: true,
      hash: true,
      version: true,
      timings: true
    });
  decorated.toShortSummaryString = formatStats(
    decorated,
    {
      chunks: true,
      chunkModules: true,
      colors: true,
      hash: true,
      version: true,
      timings: true
    });
  decorated.toBuiltString = toBuiltString(decorated);
  return decorated;
};

function toBuiltString(stats: CustomStats) {
  return (): string => {
    let str: string = '';
    const modules = stats.compilation.modules;
    modules
      .filter(module => module.built === true)
      .forEach(
      module => {
        str += '\n' + JSON.stringify(
          {
            built: module.built,
            resource: module.resource,
            size: formatSize(module.size)
          }
        );
      });
    return str;
  };
}

function formatStats(
  stats: webpack.compiler.Stats,
  printOptions: any
) {
  return (): string => {
    let str: string = '';
    let bundles = extractBundles(stats);
    bundles.forEach(stats => {
      str += stats.toString(printOptions);
    });
    return preetfy('\n' + str);
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

function preetfy(str) {
  return str.replace(/\n/g, '\n  ');
}

function formatSize(size) {
		if (size <= 0) {return '0 bytes'; }

		let abbreviations = ['bytes', 'kB', 'MB', 'GB'];
		let index = Math.floor(Math.log(size) / Math.log(1000));

		return +(size / Math.pow(1000, index))
    .toPrecision(3) + ' ' + abbreviations[index];
}