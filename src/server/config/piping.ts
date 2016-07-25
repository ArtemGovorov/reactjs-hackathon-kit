import * as _debug from 'debug';
const debug = _debug('app:bin:config:piping');
import {resolve} from 'path';
const PORT = process.env.PORT || 3000;
const PROJECT_ROOT = resolve(__dirname, '../../');
export default () => {

  const reloader = require('piping')(
    {
      main: PROJECT_ROOT + '/public/assets/server.js',
      quiet: true,
      hook: true,
      ignore: /(\/\.|~$|\.ts?|hot-update.js|\.json|\.scss$)/i
    },

    supervisor => {
      supervisor.on('started', status => {
        debug('\n  🔄  piping hot server enabled');
      });
      supervisor.on('exit', status => {
        debug('\n  😿  bye bye');
      });
    }

  );

  reloader.on('reload', function (done) {
    debug(`\n  🔄  restarting server`);
    done();
  });

  reloader.on('reloaded', function (status) {
    debug(`\n  🔄  restarted: http://localhost:${PORT}`);

  });
};