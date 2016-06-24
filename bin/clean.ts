const del = require('del');

const items = [
  'coverage/**',
  'reports/**',
  'public/**',
  'src/**/*.js',
  'src/**/*.js.map',
  'src/**/*.jsx',
  'src/**/*.jsx.map',
  'webpack/**/*.js',
  'webpack/**/*.js.map',
  'webpack/**/*.jsx',
  'webpack/**/*.jsx.map',
  'bin/**/*.js',
  'bin/**/*.js.map',
  'bin/**/*.jsx',
  'bin/**/*.jsx.map',
  'webpack-assets.json'
];

items.forEach(
  toDelete => {
    del([toDelete]).then(
      paths => {
        if (paths.length > 0) {
          console.log(toDelete + ' successfully removed');
        } else {
          console.log('Error while deleting ' + toDelete + ' (empty?)');
        }
      }
    );
  }
);