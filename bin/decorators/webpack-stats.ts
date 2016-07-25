import * as webpack from 'webpack';
import {
  PROJECT_ROOT
} from '../constants';

export interface CustomStats extends webpack.compiler.Stats {
  builtNodeModules: () => string[];
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
        size: () => number;
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
      chunks: false,
      chunkModules: false,
      colors: true,
      hash: true,
      version: true,
      timings: true
    });
  decorated.toBuiltString = toBuiltString(decorated);
  decorated.builtNodeModules = builtNodeModules(decorated);
  return decorated;
};

function builtNodeModules(stats: CustomStats) {
  return (): string[] => {
    const modules = stats.compilation.modules;
    return modules
      .filter(
      module =>
        module.built === true
        && /node_modules/i.test(module.resource)
      )
      .map<string>(
      module => {
        return module
          .resource
          .split(PROJECT_ROOT + '\/')
          .pop();
      }
      );
  };
}

function toBuiltString(stats: CustomStats) {
  return (): string => {
    const modules = stats.compilation.modules;
    return modules
      .filter(
      module => { return module.built === true && module.resource !== undefined; }
      )
      .map(
      module => {
        let str = '';
        str += `${module
          .resource
          .split(PROJECT_ROOT + '\/')
          .pop()} (${formatSize(module.size())})`;
        return str;
      })
      .join('\n');
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



function formatSize(size) {
		if (size <= 0) { return '0 bytes'; }

		let abbreviations = ['bytes', 'kB', 'MB', 'GB'];
		let index = Math.floor(Math.log(size) / Math.log(1000));

		return +(size / Math.pow(1000, index))
    .toPrecision(3) + ' ' + abbreviations[index];
}