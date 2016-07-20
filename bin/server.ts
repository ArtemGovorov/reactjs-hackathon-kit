import * as express from 'express';
import expressConfig from './config/express';
import parseConfig from './config/parse';
import piping from './config/piping';
const ENV = process.env.NODE_ENV || 'development';
if (ENV === 'development') {
  piping();
}

const App = require('../public/assets/server');

const app: express.Express = express();

/*
 * Bootstrap application settings
 */
parseConfig(app);
expressConfig(app);


/*
 * This is where the magic happens. We take the locals data we have already2
 * fetched and seed our stores with data.
 * App is a function that requires store data and url
 * to initialize and return the React-rendered html string
 */
app.get('*', App.default);

app.listen(app.get('port'));


