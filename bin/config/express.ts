import * as express from 'express';
import * as bodyParser from 'body-parser';
import {join} from 'path';
import * as _debug from 'debug';
import * as methodOverride from 'method-override';
const ENV = process.env.NODE_ENV || 'development';
const debug = _debug('app:bin:config:express');

export default (app: express.Express) => {
  app.set('port', (process.env.PORT || 3000));

  //We dpn't want an attacker building a site profile
  app.disable('x-powered-by');
  app.use(bodyParser.json());
  // For parsing application/x-www-form-urlencoded
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(methodOverride());
  app.use(express.static(join(__dirname, '../../', 'public')));
  // For Heroku deployment to work
  app.set('trust proxy', 'loopback');
  debug(`\n  ${
    ENV === 'development' ?
      '🚧' :
      '🖥'}  Starting ${
    ENV === 'development' ?
      'development ' :
      ''}server at http://localhost:${app.get('port')}`);
  debug(`🌳  NODE_ENV: ${ENV}`);
};

