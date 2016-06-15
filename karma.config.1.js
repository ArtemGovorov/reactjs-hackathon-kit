var argv = require('yargs');
var webpackConfig = require('./config/webpack.test');
require('es6-object-assign').polyfill();

var karmaConfig = {

  basePath: '', // project root in relation to bin/karma.js
  // enable / disable watching file and executing tests whenever any file changes
  autoWatch: true,
  autoWatchBatchDelay: 300,
  files: [
    {
      pattern: './tests/karma.bundler.ts',
      watched: true,
      served: true,
      included: true
    }
  ],
  colors: true,
  singleRun: false,//!argv.watch,
  frameworks: ['mocha',],
  reporters: ['mocha'],
  captureTimeout: 60000,
  preprocessors: {
    //'tests/karma.bundler.ts': ['webpack'],
    'tests/karma.bundler.ts': ['webpack', 'sourcemap'],
  },
  client: {
    mocha: {
      reporter: 'html', // change Karma's debug.html to the mocha web reporter
      ui: 'bdd',
      timeout: 15000
    }
  },

  browsers: ['Chrome'],
  webpack: {
    devtool: 'source-map-inline',
    resolve: Object.assign({}, webpackConfig.resolve, {
      alias: Object.assign({}, webpackConfig.resolve.alias, {
        sinon: 'sinon/pkg/sinon.js'
      })
    }),
    plugins: webpackConfig.plugins,
    module: {
      noParse: [
        /\/sinon\.js/
      ],
      loaders: webpackConfig.module.loaders.concat([
        {
          test: /sinon(\\|\/)pkg(\\|\/)sinon\.js/,
          loader: 'imports?define=>false,require=>false'
        }
      ])
    },

    externals: Object.assign({}, webpackConfig.externals, {
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': 'window'
    }),
    postcss: webpackConfig.postcss
  },
  webpackMiddleware: {
    quiet: false,
    noInfo: true
  },
  coverageReporter: {
    reporters: [
      { type: 'text-summary' },
      { type: 'lcov', dir: 'coverage' }
    ]
  }
};


/*karmaConfig.reporters.push('coverage');
karmaConfig.webpack.module['preLoaders'] = [{
  test: /\.(ts|tsx)$/,
  include: new RegExp('src'),
  loader: 'isparta',
  exclude: /node_modules/
}];
*/
// cannot use `export default` because of Karma.
module.exports = function (cfg) {

  return cfg.set(karmaConfig)
}

