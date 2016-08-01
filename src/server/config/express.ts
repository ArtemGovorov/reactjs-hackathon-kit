import * as express from 'express';
import * as bodyParser from 'body-parser';
import {join}  from 'path';
import * as _debug from 'debug';
import * as methodOverride from 'method-override';


const ENV = process.env.NODE_ENV || 'development';
const debug = _debug('app:bin:config:express');
const PORT = process.env.PORT || 3000;

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
    let message = `\n  ${
      ENV === 'development' ?
        '🚧  starting: ' :
        '🚀  launching: '}http://localhost:${PORT}`;

    debug(`\n  🌳  NODE_ENV: ${ENV}`);
    debug(`\n  ${message}`);
  }




};

