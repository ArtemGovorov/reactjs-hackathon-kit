const del = require('del');

const items = [
  'config/**/*.js',
  'public/**',
  'src/**/*.js',
  'src/**/*.js.map',
  'src/**/*.jsx',
  'src/**/*.jsx.map'
];

items.forEach(
  (toDelete, index, array) => {
  del([toDelete])
  .then(
     paths => {
      if (paths.length > 0) {
        console.log(toDelete + ' successfully removed');
      } else {
        console.log('Error while deleting ' + toDelete + ' (empty?)');
      }
    }
  );
});