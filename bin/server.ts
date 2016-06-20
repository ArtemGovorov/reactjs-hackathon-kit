import * as express from 'express';
import * as webpack from 'webpack';
import { ENV } from './config/appConfig';
import expressConfig from './config/express';
import parseConfig from './config/parse';
import * as webpackDevConfig from '../webpack/webpack.config.dev-client';
const App = require('../public/assets/server');
const app: express.Express = express();


if (ENV === 'development') {
  const compiler = webpack(webpackDevConfig);
  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: webpackDevConfig.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

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
