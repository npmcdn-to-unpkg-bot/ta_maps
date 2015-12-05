var src = __dirname + '/src',
    output = __dirname + '/build';
module.exports = {
    entry: src + '/main.js',
    output: {
        path: output,
        filename: 'bundle.js',
        publicPath: '/assets/'
    },
    module: {
        loaders: [
            { test: /\.css$/, loader: 'style!css' },
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
};
