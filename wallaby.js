var babel = require('babel-core');
var wallabyWebpack = require('wallaby-webpack');

var webpackPostprocessor = wallabyWebpack({
    entryPatterns: [
        'tests/karma.bundler.js',
        'tests/**/*.spec.js'
    ],
    module: {
        externals: {
            'react': 'React',
            'react/addons': true,
            'react/lib/ExecutionEnvironment': true,
            'react/lib/ReactContext': 'window'
        },
        loaders: [
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            {
                test: /\.html$/,
                exclude: /node_modules/,
                loader: 'raw'
            },
            {
                test: /\.less$/,
                loader:
                'style!css?sourceMap&-minimize&modules&importLoaders=1&sourceMap&localIdentName=[local]___[hash:base64:5]!postcss!less?outputStyle=expanded&sourceMap'
            },
            {
                test: /\.scss$/,
                loader: 'style!css?sourceMap&-minimize&modules&importLoaders=1&sourceMap&localIdentName=[local]___[hash:base64:5]!postcss!sass?outputStyle=expanded&sourceMap'
            },
            {
                test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/font-woff'
            },
            {
                test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=application/octet-stream'
            },
            {
                test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'file'
            },
            {
                test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
                loader: 'url?limit=10000&mimetype=image/svg+xml'
            },
            {
                test: /\.(jp[e]?g|png|gif|svg)$/i,
                loader: 'file-loader?name=img/[name].[ext]'
            }
        ],
    }
});

module.exports = function () {
    return {
        files: [
            { pattern: 'testlib/phantomPolyfill.js', instrument: false }, // required when testing react components to polyfill the bind() method
            { pattern: 'node_modules/react-tools/src/test/phantomjs-shims.js', instrument: false },
            { pattern: 'node_modules/sinon/pkg/sinon.js', instrument: false },
            { pattern: 'node_modules/chai/chai.js', instrument: false },
            { pattern: 'src/**/*.html', load: false },
            { pattern: 'src/**/*.scss', load: false },
            { pattern: 'src/**/*.css', load: false },
            { pattern: 'src/**/*.jpg', load: false },
            { pattern: 'src/**/*.ts', load: false },
            { pattern: 'src/**/*.tsx', load: false },
            { pattern: 'tests/karma.bundler.ts', load: false },
            { pattern: 'node_modules/**/*.js', ignore: true }
        ],

        tests: [

            { pattern: 'tests/**/*.spec.ts' },
            { pattern: 'tests/**/*.spec.tsx' },
            { pattern: 'node_modules/**/*.js', ignore: true }
        ],

        preprocessors: {
            '**/*.js': file => babel.transform(file.content, { sourceMap: true })
        },
        "testFramework": "mocha",
        postprocessor: webpackPostprocessor,
        bootstrap: function (wallaby) {
            window.__moduleBundler.loadTests();
        }
    };
};