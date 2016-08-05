import displayBanner from './tasks/display-banner';
import terminate from './tasks/terminate';
import buildDll from './tasks/build-dll';
import startClientHMR from './tasks/start-client-hmr';
import startServerHMR from './tasks/start-server-hmr';
import startClient from './tasks/start-client';
import startServer from './tasks/start-server';

const argv = require('yargs').argv;
const clear = require('clear');
clear(true);

if (argv.dev) {
  Promise.resolve()
    .then(() => displayBanner(''))
    .then(() => terminate())
    .then(() => buildDll())
    .then(() => startClientHMR())
    .then(() => startServerHMR())
    .catch((error) => {
      console.log(error);
    });
} else {
  Promise.resolve()
    .then(() => displayBanner(''))
    .then(() => startClient())
    .then(() => startServer())
    .catch((error) => {
      console.log(error);
    });


}

