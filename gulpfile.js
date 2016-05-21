'use strict';
let gulp = require('gulp'),
    gutil = require('gulp-util'),
    webpack = require('webpack'),
    WebpackDevServer = require('webpack-dev-server'),
    libsWebpackConfig = require('./libs-webpack.config'),
    webpackConfig = require('./webpack.config.js');

//webpackConfig.output.path = outputPath;

// The development server (the recommended option for development)
gulp.task('default', ['webpack-dev-server']);

// Build and watch cycle (another option for development)
// Advantage: No server required, can run app from filesystem
// Disadvantage: Requests are not blocked until bundle is available,
//               can serve an old app on refresh
gulp.task('build-dev', ['webpack:build-dev'], () => {
    gulp.watch(['app/**/*'], ['webpack:build-dev']);
});

// Production build
gulp.task('build', ['webpack:lib-build', 'webpack:build']);

gulp.task('webpack:build', callback => {
    webpackBuild(webpackConfig, callback);
});

gulp.task('webpack:lib-build', callback => {
    webpackBuild(libsWebpackConfig, callback);
});

function webpackBuild(config, callback) {
    // modify some webpack config options
    let myConfig = Object.create(config);
    myConfig.plugins = (myConfig.plugins || []).concat(
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin()
    );

    // run webpack
    webpack(myConfig, (err, stats) => {
        if (err) {
            throw new gutil.PluginError('webpack:build', err);
        }

        gutil.log('[webpack:build]', stats.toString({
            colors: true
        }));
        callback();
    });
}

// modify some webpack config options
let myDevConfig = Object.create(libsWebpackConfig);
myDevConfig.devtool = 'eval-source-map';
myDevConfig.debug = true;

// create a single instance of the compiler to allow caching
let devCompiler = webpack(myDevConfig);

gulp.task('webpack:build-libs-dev', function (callback) {
    // run webpack
    devCompiler.run(function (err, stats) {
        if (err) throw new gutil.PluginError('webpack:build-dev', err);
        gutil.log('[webpack:build-dev]', stats.toString({
            colors: true
        }));
        callback();
    });
});

gulp.task('webpack-dev-server', ['webpack:build-libs-dev'], callback => {
    // modify some webpack config options
    let serverConfig = Object.create(webpackConfig);
    serverConfig.devtool = 'eval-source-map';
    serverConfig.debug = true;
    let serverCompiler = webpack(serverConfig);

    // Start a webpack-dev-server
    new WebpackDevServer(serverCompiler, {
        // contentBase: 'build',
        publicPath: '/' + serverConfig.output.publicPath,
        stats: {
            colors: true
        }
    })
        .listen(8080, 'localhost', err => {
            if (err) {
                throw new gutil.PluginError('webpack-dev-server', err);
            }

            gutil.log('[webpack-dev-server]', 'http://localhost:8080/webpack-dev-server/index.html');
            callback();
        });
});
