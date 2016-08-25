var path = require('path');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'fe', 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'fe', 'build');

module.exports = {
    entry: {
        index: path.resolve(APP_PATH, 'index', 'index.jsx')
    },
    output: {
        path: BUILD_PATH,
        filename: '[name].js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            loader: 'babel',
            include: APP_PATH,
            query: {
                presets: ['es2015', 'react']
            }
        }, {
            test: /\.scss$/,
            loaders: ['style', 'css', 'sass'],
            include: APP_PATH
        }]
    },
    resolve: {
        extensions: ['', '.js', '.jsx', '.scss']
    }
};