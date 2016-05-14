var src = __dirname + '/src',
    output = __dirname + '/build';
module.exports = {
    entry: {
        cdt: src + '/cdt.js',
        int: src + '/int.js',
        nz: src + '/nz.js'//,
        // main: src + '/main.js'
    },
    output: {
        path: output,
        filename: '[name].bundle.js',
        publicPath: '/assets/'
    },
    module: {
        loaders: [
            {
                test: require.resolve('ol3-layerswitcher/src/ol3-layerswitcher'),
                loader: 'imports?ol=openlayers'
            },
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
