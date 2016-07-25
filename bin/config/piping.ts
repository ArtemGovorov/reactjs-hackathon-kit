import * as _debug from 'debug';
const debug = _debug('app:bin:config:piping');
import {PORT, PROJECT_ROOT} from './constants';

export default () => {

  const reloader = require('piping')(
    {
      main: PROJECT_ROOT + '/bin/server.js',
      quiet: true,
      hook: true,
      ignore: /(\/\.|~$|\.ts?|hot-update.js|\.json|\.scss$)/i
    },

    supervisor => {
      supervisor.on('started', status => {
        debug('\n  🔄  piping hot server enabled');
        process.env.restarted = 0;
      });
      supervisor.on('exit', status => {
        debug('\n  😿  bye bye');
        process.env.restarted = 0;
      });
    }

  );

  reloader.on('reload', function (done) {
    debug(`\n  🔄  restarting server`);
    process.env.restarted++;
    done();
  });

  reloader.on('reloaded', function (status) {
    debug(`\n  🔄  restarted: http://localhost:${PORT} - ${process.env.restarted}`);

  });
};