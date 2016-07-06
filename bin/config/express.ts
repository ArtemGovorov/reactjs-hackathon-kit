import * as express from 'express';
import * as bodyParser from 'body-parser';
import {join} from 'path';
import * as _debug from 'debug';
import * as methodOverride from 'method-override';
import {  ENV } from './appConfig';
const debug = _debug('app:bin:config:express');

export default (app: express.Express) => {
  app.set('port', (process.env.PORT || 3000));

  // X-Powered-By header has no functional value.
  // Keeping it makes it easier for an attacker to build the site's profile
  // It can be removed safely
  app.disable('x-powered-by');

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
  app.use(methodOverride());
  app.use(express.static(join(__dirname, '../../', 'public')));

  // I am adding this here so that the Heroku deploy will work
  // Indicates the app is behind a front-facing proxy,
  // and to use the X-Forwarded-* headers to determine the connection and the IP address of the client.
  // NOTE: X-Forwarded-* headers are easily spoofed and the detected IP addresses are unreliable.
  // trust proxy is disabled by default.
  // When enabled, Express attempts to determine the IP address of the client connected through the front-facing proxy, or series of proxies.
  // The req.ips property, then, contains an array of IP addresses the client is connected through.
  // To enable it, use the values described in the trust proxy options table.
  // The trust proxy setting is implemented using the proxy-addr package. For more information, see its documentation.
  // loopback - 127.0.0.1/8, ::1/128
  app.set('trust proxy', 'loopback');
  debug(`\n  ${ENV ? '🚧' : '🖥'}  Starting ${ENV ? 'development ' : ''}server at http://localhost:${app.get('port')}`);
  debug(`🌳  NODE_ENV: ${ENV}`);
};

