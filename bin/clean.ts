#!/usr/bin/env node
import * as del from 'del';

const items = [
  'coverage/**',
  'reports/**',
  //  'public/**',
  'src/**/*.js',
  'src/**/*.js.map',
  'webpack/**/*.js',
  'webpack/**/*.js.map',
  'bin/**/*.js',
  'bin/**/*.js.map',
  'webpack-assets.json',
  'webpack-assets-server.json',
  'logs/**'
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