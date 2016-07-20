
import buildClientHMR from './tasks/build-client-hmr';
import buildServerHMR from './tasks/build-server-hmr';
import buildDll from './tasks/build-dll';

const _debug = require('debug');
const debug = _debug('app:start');

debug(`Let's get this party started!`);

Promise.resolve()
  .then(() => buildDll())
  .then(() => buildClientHMR())
  .then(() => buildServerHMR());

