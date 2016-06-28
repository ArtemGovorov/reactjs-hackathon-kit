import * as express from 'express';

import expressConfig from './config/express';
import parseConfig from './config/parse';

const App = require('../public/assets/server');
const app: express.Express = express();

/*
 * Bootstrap application settings
 */
expressConfig(app);
parseConfig(app);

/*
 * This is where the magic happens. We take the locals data we have already
 * fetched and seed our stores with data.
 * App is a function that requires store data and url
 * to initialize and return the React-rendered html string
 */
app.get('*', App.default);

app.listen(app.get('port'));
