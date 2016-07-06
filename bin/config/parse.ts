const ParseServer = require('parse-server').ParseServer;
const ParseDashboard = require('parse-dashboard');
import * as express from 'express';
import {resolve} from 'path';
import * as _debug from 'debug';
const debug = _debug('app:bin:config:parse');

export const APP_DIR = resolve(__dirname, '../../', 'src');
export default (app: express.Express) => {
  const databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;
  if (!databaseUri) {
    debug('DATABASE_URI not specified, falling back to localhost');
  }

  const api = new ParseServer({
    verbose: false,
    databaseURI: databaseUri || 'mongodb://localhost:27017/dev',
    cloud: process.env.CLOUD_CODE_MAIN || `${APP_DIR}/server/api/main.js`,
    appId: process.env.APP_ID || 'myAppId',
    masterKey: process.env.MASTER_KEY || 'myAppId', // Add your master key here. Keep it secret!
    serverURL: process.env.SERVER_URL || 'http://localhost:3000/api,',  // Don't forget to change to https if needed
  });

  const dashboard = new ParseDashboard({
    apps: [
      {
        serverURL: process.env.SERVER_URL || 'http://localhost:3000/api',
        appId: process.env.APP_ID || 'myAppId',
        masterKey: process.env.MASTER_KEY || 'myAppId', // Add your master key here. Keep it secret!
        appName: 'MyApp'
      }],

    users: [
      {
        user: 'admin',
        pass: 'password'
      }
    ]

  }, true);

  // Serve the Parse API on the /parse URL prefix
  const mountPath = process.env.PARSE_MOUNT || '/api';
  app.use(mountPath, api);
  debug('Serving parse server at ' + mountPath);
  app.use('/parse-dashboard', dashboard);
  debug('Serving parse dashboard ' + '/parse-dashboard');

};
