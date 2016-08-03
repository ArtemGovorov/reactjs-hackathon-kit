import displayBanner from './tasks/display-banner';
import terminate from './tasks/terminate';
import buildDll from './tasks/build-dll';
import startClientHMR from './tasks/start-client-hmr';
import startServerHMR from './tasks/start-server-hmr';


const clear = require('clear');
clear(true);

Promise.resolve()
  .then(() => displayBanner(`React Webpack Funpack!`))
  .then(() => terminate())
  .then(() => buildDll())
  .then(() => startClientHMR())
  .then(() => startServerHMR())
  .catch((error) => {
    console.log(error);
  });

