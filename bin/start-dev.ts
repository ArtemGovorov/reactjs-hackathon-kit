//  webpack-dev-server --config bundling/webpack.config.dev.client.js --progress --colors --hot

const webpack = require('webpack');
const path = require('path');

const clientConfig = require('./config/webpack.config.dev-client');
const nodemon = require('nodemon');
const PrettyError = require('pretty-error');
const pretty = new PrettyError();
const log = require('npmlog');
import * as express from 'express';
log.level = 'warn';

const _debug = require('debug');
const debug = _debug('app:start-dev');

import {
  PUBLIC_PATH,
  PORT,
  ASSETS_DIR,
  PROJECT_ROOT
} from './config/constants';

const keypress = require('keypress');

function canContinue(where, err, stats) {
  if (err) {
    debug('webpack', where + ' compiler had error:', err);
    return false;
  }
  let jsonStats = stats.toJson();
  if (jsonStats.errors.length > 0) {
    log.error('webpack', where + ' compiler had errors:');
    jsonStats.errors.map(function (error) { console.log(pretty.render(error)); });
    return false;
  }
  if (jsonStats.warnings.length > 0) {
    log.warn('webpack', where + ' compiler had warnings:', jsonStats.warnings);
    return false;
  }
  return true;
}

function registerRefreshListener() {
  keypress(process.stdin);
  process.stdin.on('keypress', function (ch, key) {
    if (key && key.name === 'p') {
      process.stdout.write('\n');
      bundleServer();
    }
  });
  process.stdin.resume();
  debug('webpack', 'Press "p" to hot-patch the server');
}

// -----------------------------------------------------------------------------
// Server
// -----------------------------------------------------------------------------
let startedServer = false;
function startServer() {
/*  nodemon({
    execMap: {
      js: 'node',
    },
    script: PROJECT_ROOT + '/bin/server.js',
    ignore: ['*'],
    watch: ['nothing/'],
    ext: 'noop',
  });

  nodemon
    .on('quit', () => debug('nodemon', 'stopped server. bye'))
    .on('exit', () => debug('nodemon', 'nodemon exited'))
    .on('crash', () => debug('nodemon', 'nodemon crashed'))
    .on('stderr', () => debug('nodemon', 'nodemon stderr'))
    .on('restart', () => debug('nodemon', 'patched server'));*/
}

function bundleServer() {
  const serverConfig = require('./config/webpack.config.dev-server');
  const serverCompiler = webpack(serverConfig);
  let bundleStart;

  serverCompiler.plugin('compile', function () {
    debug('webpack', 'Bundling server...');
    bundleStart = Date.now();
  });

  serverCompiler.plugin('done', function () {
    debug('webpack', 'Bundled server in ' + (Date.now() - bundleStart) + 'ms!');
    if (startedServer) {
     // nodemon.restart();
    } else {
      startedServer = true;
      startServer();

      registerRefreshListener();
    }
  });

  serverCompiler.watch(
    {
      /** After a change the watcher waits that time (in milliseconds) for more changes. Default: 300. */
      aggregateTimeout: 300,
      /** The watcher uses polling instead of native watchers.
       * true uses the default interval, a number specifies a interval in milliseconds.
       * Default: undefined (automatic). */
      poll: undefined
    },
    function (err, stats) {
      canContinue('server', err, stats);
    });
}

// ----------------------------------------------------------------------------
// Client
// ----------------------------------------------------------------------------
const clientCompiler = webpack(clientConfig);
let bundleClientStart;
clientCompiler.plugin('compile', function () {
  debug('webpack', 'Bundling client...');
  bundleClientStart = Date.now();
});

clientCompiler.plugin('done', function (stats) {
  console.log('HELLO');
  if (!canContinue('server', false, stats)) { return; }
  debug('webpack', 'Bundled client in ' + (Date.now() - bundleClientStart) + 'ms!');
  bundleServer();
});

//const host = 'localhost';
const devOptions = {
  contentBase: 'http://' + 'localhost' + ':' + (PORT + 1),
  quiet: true,
  noInfo: true,
  hot: false,
  inline: false,
  overlay: true,
  lazy: false,
  publicPath: `http://localhost:${PORT + 1}${PUBLIC_PATH}`,
  headers: { 'Access-Control-Allow-Origin': '*' },
  stats: {
    colors: false
  }
};

const hotOptions = {
  log: str => debug('\n  🔥  client ' + str),
  overlay: true,
  quiet: true,
  noInfo: true
};



const app: express.Express = express();

app.use(require('webpack-dev-middleware')(clientCompiler, devOptions));
app.use(require('webpack-hot-middleware')(clientCompiler, hotOptions));

app.listen((PORT + 1), function onAppListening(err) {
  if (err) {
    debug(err);
  } else {
    debug(`\n  🔥  hot reloading: http://localhost:${(PORT + 1)}`);
  }
});


// work around a weird nodemon bug where something was logged to the console
// even after the process exited
process.on('SIGINT', function (err) {
  if (err) { console.log('fuck' + err.stack); }
  process.exit();
});