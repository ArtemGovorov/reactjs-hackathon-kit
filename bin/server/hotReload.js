var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var devConfig = require('../../config/webpack.clientside.dev');
var host = 'localhost';
var port = 8080;

new WebpackDevServer(webpack(devConfig), {
  publicPath: devConfig.output.publicPath,
  quiet: false,
  noInfo: false,
  hot: true,
  progress: true,
  lazy: false,
  historyApiFallback: true,
  stats: { colors: true }
}).listen(port, host, function (err, result) {
  if (err) {
    console.log(err);
  }
  console.log('🚧  Webpack Server launched at http://' + host + ':' + port + '\n 🚧  🔥  Hot Reload Enabled 🔥 ');

});