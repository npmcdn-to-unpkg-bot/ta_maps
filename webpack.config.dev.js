import webpack from "webpack";
import path from "path";

export default {
    debug: true,
    devtool: 'cheap-module-eval-source-map',
    // noInfo: false,
    entry: {
        int: path.join(__dirname, 'src', 'int.js')
    },
    target: 'web',
    output: {
        path: path.join(__dirname, 'dist'),
        publicPath: '/',
        filename: '[name].bundle.js'
    },
    devServer: {
        contentBase: './src'
    },
    plugins: [
        new webpack.NoErrorsPlugin()
    ],
    module: {
        loaders: [
            {test: /\.js$/, include: path.join(__dirname, 'src'), loader: 'babel'},
            {test: /(\.css)$/, loaders: ['style', 'css']}
        ]
    }
};
