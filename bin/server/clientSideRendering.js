var express = require('express');
var compress = require('compression');
var path = require('path');
var webpack = require('webpack');
var server = express();
var port = process.env.PORT || 8080;
var webpackConfig = require('../../config/webpack.clientside.dev');

var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHMRMiddleware = require('webpack-hot-middleware');
var config = require('../../config/webpack.constants');


var host = config.HOST;
var port = config.PORT;

server.use(compress({ threshold: 0 }));

if (!config.DEV) {
  var compiler = webpack(webpackConfig)
  server.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true,
    noInfo: true,
    hot: true,
    progress: true,
    lazy: false,
    historyApiFallback: true,
    stats: { colors: true }
  }))
  server.use(webpackHMRMiddleware(compiler))
} else {
  server.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'index.html'))
  });
  server.use(express.static(path.resolve(__dirname, '..', '..', 'public')));
}



server.listen(port, host, function (err, result) {
  if (err) {
    console.log(err);
  }
  var host = this.address().address;
  console.log('🚧  Webpack Server launched at http://' + host + ':' + port + ' 🚧\n🔥  Hot Reload Enabled 🔥 ');

});


