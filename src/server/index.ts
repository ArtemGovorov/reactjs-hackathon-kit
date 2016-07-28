import * as express from 'express';
import expressConfig from './config/express';
import parseConfig from './config/parse';
import piping from './config/piping';
const ENV = process.env.NODE_ENV || 'development';
const DEBUGGING = process.env.DEBUGGING || false;
if (ENV === 'development' && !DEBUGGING) {
  piping();
}

import App from './server';


const app: express.Express = express();

/*
 * Bootstrap application settings
 */
/*parseConfig(app);*/
expressConfig(app);


/*
 * This is where the magic happens. We take the locals data we have already2
 * fetched and seed our stores with data.
 * App is a function that requires store data and url
 * to initialize and return the React-rendered html string
 */
app.get('*', App);

app.listen(app.get('port'));


