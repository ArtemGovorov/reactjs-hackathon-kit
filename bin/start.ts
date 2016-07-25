
import buildClientHMR from './tasks/build-client-hmr';
import buildServerHMR from './tasks/build-server-hmr';
import buildDll from './tasks/build-dll';
import terminate from './tasks/terminate';
import displayBanner from './tasks/display-banner';

import _debug from './decorators/debug';
const debug = _debug('app:start', '🎉');

const clear = require('clear');
clear(true);

Promise.resolve()
  .then(() => displayBanner(`React Webpack Funpack!`))
  .then(() => terminate())
  .then(() => buildDll())
  .then(() => buildClientHMR())
  .then(() => buildServerHMR());

