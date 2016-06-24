const del = require('del');

const items = [
  'coverage/**',
  'reports/**',
  'public/**',
  'src/**/*.js',
  'src/**/*.js.map',
  'webpack/**/*.js',
  'webpack/**/*.js.map',
  'bin/**/*.js',
  'bin/**/*.js.map',
  'webpack-assets.json'
];

items.forEach(
  toDelete => {
    del([toDelete]).then(
      paths => {
        if (paths.length > 0) {
          console.log(toDelete + ' successfully removed');
        }
      }
    );
  }
);