var path = require('path');
var rootDir = path.resolve(__dirname, '..');
global.__CLIENT__ = false;
global.__SERVER__ = true;
global.__DEVTOOLS__ = false;
global.__BASENAME__ = JSON.stringify(process.env.BASENAME || '');
global.__DISABLE_SSR__ = false;
global.__DEV__ = process.env.NODE_ENV !== 'production';
if (__DEV__) {
    if (!require('piping')({
        hook: true,
        ignore: /(\/\.|~$|\.json|\.scss$)/i
    })) {
        return;
    }
}
var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
global.webpackIsomorphicTools = new WebpackIsomorphicTools(require('../config/webpack-isomorphic-tools'))
    .development(__DEV__)
    .server(rootDir, function () {
    require('../src/server');
});
