// ---------------------------------------
// Test Environment Setup
// ---------------------------------------

import * as sinon from 'sinon';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';
import * as chaiAsPromised from 'chai-as-promised';
import * as When from 'when';
import 'rxjs/add/operator/takeUntil';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/concat';
import 'rxjs/add/observable/defer';
import 'rxjs/add/observable/concat';
import 'rxjs/add/observable/merge';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/fromPromise';
require('es6-object-assign').polyfill();
require('es6-promise').polyfill();


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