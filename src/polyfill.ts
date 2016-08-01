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
// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') {
  require.ensure = (d, c) => c(require);
}
