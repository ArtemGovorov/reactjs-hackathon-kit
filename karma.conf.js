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
  singleRun: !argv.watch,
  reporters: ['mocha'],
  captureTimeout: 60000,
  preprocessors: {
    'tests/karma.bundler.ts': ['webpack']
    //'tests/karma.bundler.ts': ['webpack', 'sourcemap']
  },
  client: {
    mocha: {
      reporter: 'html', // change Karma's debug.html to the mocha web reporter
      ui: 'bdd',
      timeout: 15000
    }
  },
  browsers: ['PhantomJS'],

  webpack: {
    devtool: 'inline-source-map',
    //devtool: 'cheap-module-source-map',
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
    // Enzyme fix, see:
    // https://github.com/airbnb/enzyme/issues/47
    externals: Object.assign({}, webpackConfig.externals, {
      'react/addons': true,
      'react/lib/ExecutionEnvironment': true,
      'react/lib/ReactContext': 'window'
    }),
    sassLoader: webpackConfig['sassLoader']
  },
  webpackMiddleware: {
    quiet: false,
    noInfo: true,
    hot: true,
    inline: true,
    progress: true,
    lazy: false,
    headers: { 'Access-Control-Allow-Origin': '*' },
    stats: { colors: true }
  },
  coverageReporter: {
    reporters: [
      { type: 'text-summary' },
      { type: 'lcov', dir: 'coverage' }
    ]
  }
};


karmaConfig.reporters.push('coverage');
karmaConfig.webpack.module['preLoaders'] = [{
  test: /\.(ts|tsx)$/,
  include: new RegExp('src'),
  loader: 'isparta',
  exclude: /node_modules/
}];

// cannot use `export default` because of Karma.
module.exports = function (cfg) {
  return cfg.set(karmaConfig)
}

