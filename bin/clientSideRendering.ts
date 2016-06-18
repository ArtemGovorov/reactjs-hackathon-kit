import * as express from 'express';
import {DEV, HOST, PORT} from '../config/webpack.constants';
const compress = require('compression');
const webpack = require('webpack');
const server = express();
const webpackConfig = require('../../config/webpack.clientside.dev');

const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHMRMiddleware = require('webpack-hot-middleware');


//if (__DEV__) {
/*if (true) {
  if (!require('piping')({
    hook: true,
    ignore: /(\/\.|~$|\.json|\.scss$)/i
  })) {
    return;
  }
}*/

server.use(compress({ threshold: 0 }));

if (DEV) {
  const compiler = webpack(webpackConfig);
  server.use(webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: false,
    noInfo: false,
    hot: true,
    progress: true,
    lazy: false,
    historyApiFallback: true,
    stats: { colors: true }
  }));
  server.use(webpackHMRMiddleware(compiler));
} else {
  server.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '..', '..', 'public', 'index.html'))
  });
  server.use(express.static(path.resolve(__dirname, '..', '..', 'public')));
}



server.listen(PORT, HOST, (err, result) => {
  if (err) {
    console.log(err);
    console.log('🚧  Webpack Server launched at http://' + HOST + ':' + PORT + ' 🚧\n🔥  Hot Reload Enabled 🔥 ');
  }
}
);





