//  webpack-dev-server --config bundling/webpack.config.dev.client.js --progress --colors --hot
console.log('THIS PAGE HAS EXECURED');
const webpack = require('webpack');
import {resolve} from 'path';
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



// -----------------------------------------------------------------------------
// Server
// -----------------------------------------------------------------------------
let startedServer = false;
let startedClient = false;
function startServer() {
  const spawn = require('child_process').spawn;
  // clone the actual env vars to avoid overrides
  const env = Object.create(process.env);
  env.NODE_ENV = 'development';
  env.DEBUG = 'app:*';

  const child = spawn(
    'node',
    ['./bin/server.js'],
    {
      env: env,
      stdio: 'inherit'
    }
  );
/*  child.stdout.pipe(process.stdout);
  // Listen for any errors:
  child.stderr.on('data', function (data) {
    console.log('There was an error: ' + data);
  });*/
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

    } else {
      startedServer = true;
      startServer();
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

  if (startedClient) {

  } else {
    startedClient = true;
    bundleServer();
  }

  /*  if (!canContinue('server', false, stats)) { return; }*/
  debug('webpack', 'Bundled client in ' + (Date.now() - bundleClientStart) + 'ms!');

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

/*const hotOptions = {
  log: str => debug('\n  🔥  client ' + str),
  overlay: true,
  quiet: true,
  noInfo: true
};
*/


const app: express.Express = express();

app.use(require('webpack-dev-middleware')(clientCompiler, devOptions));
app.use(require('webpack-hot-middleware')(clientCompiler));

app.listen((PORT + 1), function onAppListening(err) {
  if (err) {
    debug(err);
  } else {
    debug(`\n  🔥  hot reloading: http://localhost:${(PORT + 1)}`);
  }
});

