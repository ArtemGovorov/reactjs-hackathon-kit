require('es6-object-assign').polyfill();
require('es6-promise').polyfill();
// polyfill webpack require.ensure
if (typeof require.ensure !== 'function') {
  require.ensure = (d, c) => c(require);
}
