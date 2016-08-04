// ---------------------------------------
// Test Environment Setup
// ---------------------------------------

import * as sinon from 'sinon';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as When from 'when';
require('polyfill');


const Parse = require('parse');
const chaiEnzyme = require('chai-enzyme');


chai.use(sinonChai);
chai.use(chaiAsPromised);
chai.use(chaiEnzyme());
// https://github.com/wallabyjs/typescript-tsx-jsx/issues/2#issuecomment-226433637
global.should = undefined;
global.When = When;
global.Parse = Parse;
global.chai = chai;
global.sinon = sinon;
global.expect = chai.expect;
global.should = chai.should();


chai.config.includeStack = true;