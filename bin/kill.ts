#!/usr/bin/env node
import * as _debug from 'debug';
const debug = _debug('app:bin:kill');
const kill = require('kill3k');

debug('🔫  Terminating ports 3000 and 3001');
kill(3000);
kill(3001);