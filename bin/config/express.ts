import * as express from 'express';
import * as bodyParser from 'body-parser';
import {join}  from 'path';
import * as _debug from 'debug';
import * as methodOverride from 'method-override';
const path = require('path');
const existsSync = require('exists-sync');
const httpProxy = require('http-proxy');
const proxy = httpProxy.createProxyServer();
import {
  PUBLIC_PATH,
  ASSETS_DIR
} from './constants';

const ENV = process.env.NODE_ENV || 'development';
const debug = _debug('app:bin:config:express');
import {PORT} from './constants';

function createDevelopmentProxy(app) {
  // add error handling to avoid https://github.com/nodejitsu/node-http-proxy/issues/527
  proxy.on('error', (error, req, res) => {
    if (error.code !== 'ECONNRESET') { console.error('proxy error', error); }
    if (!res.headersSent) { res.writeHead(500, { 'content-type': 'application/json' }); }

    console.log('Could not connect to proxy, please try again...');
    const json = { error: 'proxy_error', reason: error.message };
    res.end(JSON.stringify(json));
  });
  debug(`${PUBLIC_PATH}*`);
  // eg /assets/*
  app.all(`${PUBLIC_PATH}*`, (req, res) => {
    // try to send the file from assets/*
    // if it doesn't exist, use the proxy instead
    const filename = path.join(ASSETS_DIR, path.basename(req.url));
    debug(filename);
    if (existsSync(filename)) {
      return res.sendFile(filename);
    }
    return proxy.web(req, res, { target: 'http://localhost:3001' });
  });
}

export default (app: express.Express) => {
  app.set('port', (process.env.PORT || PORT));

  //We don't want an attacker building a site profile
  app.disable('x-powered-by');
  app.use(bodyParser.json());
  // For parsing application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(methodOverride());


  if (ENV === 'development') {
    //createDevelopmentProxy(app);
  } else {
    // STATS.publicPath = '/assets/'
    // => app.use('/assets', express.static('assets'))
    
  }

app.use(express.static(join(__dirname, '../../', 'public')));
  // For Heroku deployment to work
  app.set('trust proxy', 'loopback');

  if (!process.env.restarted) {
    debug(`\n  🌳  NODE_ENV: ${ENV}`);
    debug(`\n  ${
      ENV === 'development' ?
        '🚧  starting: ' :
        '🚀  launching: '}http://localhost:${PORT}`);
  }

};

