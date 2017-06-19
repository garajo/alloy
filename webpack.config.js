const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    context: path.resolve(__dirname, 'src'),
    entry: {
        app: ['./app.js', './styles/main.scss'],
        vendor: ['jquery', 'foundation-sites']
    },
    output: {
        filename: './scripts/bundle.js',
        path: path.resolve(__dirname + '/dist'),
        publicPath: 'dist'
    },
    devServer: {
        contentBase: process.cwd(),
        compress: true,
        port: 9000,
        publicPath: '/'
    },
    module: {
        rules: [{
            test: /\.scss$/,
            exclude: /node_modules/,
            use: ExtractTextPlugin.extract({
                use: ['css-loader', 'sass-loader']
            })
        },
        {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },
        {
            test: /\.(png|jpg)$/,
            use: [{
                loader: 'url-loader',
                options: { limit: 10000 }
            }]
        }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'Keysight Caranu Styling Demo',
            minify: {
                collapseWhitespace: true
            },
            hash: true,
            template: './index.html'
        }),
        new ExtractTextPlugin({ filename: "./styles/bundle.css", allChunks: true }),
        new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: './scripts/vendor.js', minChunks: 'Infinity' }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ]
};

module.exports = config;