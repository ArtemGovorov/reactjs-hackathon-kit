// ---------------------------------------
// Test Environment Setup
// ---------------------------------------

import * as sinon from 'sinon';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as Rx  from 'rxjs/Rx';
import * as when from 'when';
const parse = require('parse');
const chaiEnzyme = require('chai-enzyme');

chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.use(chaiEnzyme());

global['when'] = when;
global['Parse'] = parse;
global['chai'] = chai;
global['sinon'] = sinon;
global['expect'] = chai.expect;
//global['should'] = chai['should']() as any;
global['TestScheduler'] = Rx.TestScheduler;
global['Observable'] = Rx.Observable;

chai.config.includeStack = true;

// ---------------------------------------
// Require Tests
// ---------------------------------------
// for use with karma-webpack-with-fast-source-maps
// NOTE: `new Array()` is used rather than an array literal since
// for some reason an array literal without a trailing `;` causes
// some build environments to fail.
const __karmaWebpackManifest__ = new Array() // eslint-disable-line
const inManifest = (path) => ~__karmaWebpackManifest__.indexOf(path);

// require all `tests/**/*.spec.js`
const testsContext = require.context('./', true, /\.spec\.ts$/);

// only run tests that have changed after the first pass.
const testsToRun = testsContext.keys().filter(inManifest)
  ; (testsToRun.length ? testsToRun : testsContext.keys()).forEach(testsContext);

/*const componentsContext = require.context('../src/',
  true, /^((?!bootstrap|font-awesome).)*\.js$/);
componentsContext.keys().forEach(componentsContext);*/