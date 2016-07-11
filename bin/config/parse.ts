const ParseServer = require('parse-server').ParseServer;
const ParseDashboard = require('parse-dashboard');
import * as express from 'express';
import {resolve} from 'path';
import * as _debug from 'debug';
const debug = _debug('app:bin:config:parse');
import {PORT} from './constants';
export const APP_DIR = resolve(__dirname, '../../', 'src');
export default (app: express.Express) => {

  const databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;
  if (!databaseUri) {
    debug('\n  🗄  DATABASE_URI not specified, falling back to localhost');
  }

  const api = new ParseServer({
    verbose: false,
    databaseURI: databaseUri || 'mongodb://localhost:27017/dev',
    cloud: process.env.CLOUD_CODE_MAIN || `${APP_DIR}/server/parse/main.js`,
    appId: process.env.APP_ID || 'myAppId',
    masterKey: process.env.MASTER_KEY || 'myAppId',
    serverURL: process.env.SERVER_URL || `http://localhost:${PORT}/parse`,
  });

  const dashboard = new ParseDashboard({
    apps: [
      {
        serverURL: process.env.SERVER_URL || `http://localhost:${PORT}/parse`,
        appId: process.env.APP_ID || 'myAppId',
        masterKey: process.env.MASTER_KEY || 'myAppId',
        appName: 'MyApp'
      }],

    users: [
      {
        user: 'admin',
        pass: 'password'
      }
    ]

  }, true);


  const mountPath = process.env.PARSE_MOUNT || '/parse';
  app.use(mountPath, api);
  debug(`\n  🗄  Serving parse server at http://localhost:${PORT} ${mountPath}`);
  app.use('/parse-dashboard', dashboard);
  debug('\n  🗄  Serving parse dashboard ' + '/parse-dashboard');

};
