import * as _debug from 'debug';
const debug = _debug('app:bin:config:piping');
import {PORT} from './constants';

export default () => {

  const reloader = require('piping')(
    {
      quiet: true,
      hook: true,
      ignore: /(\/\.|~$|\.ts?|\.json|\.scss$)/i
    },

    supervisor => {
      supervisor.on('started', status => {
        debug('\n  🔄  Piping hot development server enabled');
        process.env.restarted = 0;
      });
      supervisor.on('reloaded', status => {
        process.env.restarted++;
      });

    }

  );

  reloader.on('reload', function (done) {
    if (process.env.restarted) {
      debug('\n  🔄  Restarting server');
    }
    done();
  });

  reloader.on('reloaded', function (status) {
    if (process.env.restarted > 0) {
      debug(`\n  🔄  Restarted: http://localhost:${PORT} - ${process.env.restarted} restart(s)`);
    }
  });
};