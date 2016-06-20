import {join} from 'path';
import * as webpack from 'webpack';
import {Configuration} from 'webpack';
const assetsPath = join(__dirname, '..', 'public', 'assets');

const commonLoaders = [
  {
    /*
     * TC39 categorises proposals for babel in 4 stages
     * Read more http://babeljs.io/docs/usage/experimental/
     */
    test: /\.js$|\.jsx$/,
    loader: 'babel-loader',
    // Reason why we put this here instead of babelrc
    // https://github.com/gaearon/react-transform-hmr/issues/5#issuecomment-142313637
    query: {
      'presets': ['es2015', 'react', 'stage-0'],
      'plugins': ['transform-decorators-legacy', 'transform-object-assign']
    },
    include: join(__dirname, '..', 'app'),
    exclude: join(__dirname, '..', 'node_modules')
  },
  { test: /\.json$/, loader: 'json-loader' },
  {
    test: /\.(png|jpg|jpeg|gif|svg|woff|woff2)$/,
    loader: 'url',
    query: {
      name: '[hash].[ext]',
      limit: 10000,
    }
  },
  { test: /\.html$/, loader: 'html-loader' }
];

const webpackConfig: Configuration = {

  context: join(__dirname, '..', 'src'),
  entry: {
    server: './server'
  },
  target: 'node',
  output: {
    // The output directory as absolute path
    path: assetsPath,
    // The filename of the entry chunk as relative path inside the output.path directory
    filename: 'server.js',
    // The output path from the view of the Javascript
    publicPath: '/assets/',
    libraryTarget: 'commonjs2'
  },
  module: {
    loaders: commonLoaders.concat([
      {
        test: /\.css$/,
        loader: 'css/locals?module&localIdentName=[name]__[local]___[hash:base64:5]'
      }
    ])
  },
  resolve: {
    root: [join(__dirname, '..', 'src')],
    extensions: ['', '.js', '.jsx', '.css'],
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEVCLIENT__: false,
      __DEVSERVER__: true
    })
  ]
};

// The configuration for the server-side rendering
webpackConfig['name'] = 'server-side rendering';
export = webpackConfig;