const kill = require('kill3k');
import _debug from '../decorators/debug';
const debug = _debug('app:tasks:clean', '👾');

import {
  PORT,
} from '../config/constants';

export default function () {


  return new Promise<string>(

    (resolve, reject) => {

      debug(`terminating ports ${PORT} and ${PORT + 1}`);
      kill(PORT);
      kill(PORT + 1);
      resolve();

    });

}

