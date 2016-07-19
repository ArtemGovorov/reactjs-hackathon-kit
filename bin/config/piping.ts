import * as _debug from 'debug';
const debug = _debug('app:bin:config:piping');
import {PORT,PROJECT_ROOT} from './constants';

export default () => {

  const reloader = require('piping')(
    {
      main: PROJECT_ROOT + '/bin/server.js',
      quiet: true,
      hook: true,
      ignore: /(\/\.|~$|\.ts?|\.json|\.scss$)/i
    },

    supervisor => {
      supervisor.on('started', status => {
        debug('\n  🔄  piping hot server enabled');
        process.env.restarted = 0;
      });
      supervisor.on('reloaded', status => {
        debug('\n  🔄  piping reloaded', status);
        process.env.restarted++;
      });

    }

  );

  reloader.on('reload', function (done) {
    if (process.env.restarted) {
      debug('\n  🔄  restarting server');
    }
    done();
  });

  reloader.on('reloaded', function (status) {
    if (process.env.restarted > 0) {
      debug(`\n  🔄  restarted: http://localhost:${PORT} - ${process.env.restarted} restart(s)`);
    }
  });
};