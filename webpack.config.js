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
            { test: /\.css$/, loader: 'style!css' }
        ]
    }
};
