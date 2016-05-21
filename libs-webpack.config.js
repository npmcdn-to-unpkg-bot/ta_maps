var src = __dirname + '/src',
    output = __dirname + '/build';
module.exports = {
    entry: {
        maps: src + '/maps.js',
        trails: src + '/trails.js'
    },
    output: {
        path: output,
        filename: '[name].bundle.js',
        library: '[name]'
    },
    externals: {
        'ol': 'ol'
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: 'style!css'},
            {
                test: /\.js?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: [
                        'es2015',
                        'stage-0',
                        'react'
                    ],
                    plugins: ['transform-runtime']
                }
            }
        ]
    }
};
