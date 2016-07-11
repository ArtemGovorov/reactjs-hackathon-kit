#!/usr/bin/env node
import * as _debug from 'debug';
const debug = _debug('app:bin:kill');
const kill = require('kill3k');
import {PORT} from './config/constants';

debug(`\n  🔫  Terminating ports ${PORT} and ${PORT + 1}`);
kill(PORT);
kill(PORT + 1);