import displayBanner from './tasks/display-banner';
import terminate from './tasks/terminate';

import startClient from './tasks/start-client';
import startServer from './tasks/start-server';


const clear = require('clear');
clear(true);

Promise.resolve()
  .then(() => displayBanner(`React Webpack Funpack!`))
  .then(() => startClient())
  .then(() => startServer())
  .catch((error) => {
    console.log(error);
  });

