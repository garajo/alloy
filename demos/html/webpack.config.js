/* eslint-env node */

const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  context: path.resolve(__dirname),
  entry: {
    'app-css': ['./app.js', 'alloy-css'],
    'app-scss': ['./app.js', 'alloy-scss'],
    'app-scss-import': ['./app.js', path.resolve(__dirname, 'main.scss')],
    vendor: ['jquery', 'foundation-sites']
  },
  output: {
    filename: './scripts/[name].bundle.js',
    chunkFilename: "[id].chunk.js",
    path: path.resolve(__dirname, 'dist'),
    publicPath: 'dist'
  },
  resolve: {
    alias: {
      'alloy-scss': '@keysight/alloy/scss/alloy.scss',
      'alloy-css': '@keysight/alloy/css/alloy.css',
      'jquery': 'jquery',
      'foundation-sites': 'foundation-sites'
    },
    modules: [
      path.resolve('./node_modules'),
      path.resolve('../../node_modules')
    ]
  },
  devServer: {
    contentBase: process.cwd(),
    inline: true,
    hot: true,
    port: 9000,
    publicPath: '/'
  },
  module: {
    rules: [{
      test: /\.css$/,
      loader: ['style-loader', 'css-loader']
    }, {
      test: /\.scss$/,
      exclude: /node_modules/,
      loaders: ['style-loader', 'css-loader', 'sass-loader?sourceMap']
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.(png|jpg)$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }]
    }, {
      test: /\.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
      loader: 'file-loader?name=/fonts/[name].[ext]'
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Keysight Caranu Styling Demo',
      minify: {
        collapseWhitespace: true
      },
      hash: true,
      filename: 'index.html',
      template: './index.html',
      chunks: ['app-css', 'vendor']
    }),
    new HtmlWebpackPlugin({
      title: 'Keysight Caranu Styling Demo - CSS',
      minify: {
        collapseWhitespace: true
      },
      hash: true,
      filename: 'index-css.html',
      template: './main.html',
      chunks: ['app-css', 'vendor']
    }),
    new HtmlWebpackPlugin({
      title: 'Keysight Caranu Styling Demo - SCSS(SASS)',
      minify: {
        collapseWhitespace: true
      },
      hash: true,
      filename: 'index-scss.html',
      template: './main.html',
      chunks: ['app-scss', 'vendor']
    }),
    new HtmlWebpackPlugin({
      title: 'Keysight Caranu Styling Demo - Imported SCSS(SASS)',
      minify: {
        collapseWhitespace: true
      },
      hash: true,
      filename: 'index-scss-import.html',
      template: './main.html',
      chunks: ['app-scss-import', 'vendor']
    }),
    new ExtractTextPlugin({
      filename: './bundle.css',
      allChunks: true
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: './scripts/vendor.js',
      minChunks: 'Infinity'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    }),
  ]
};

module.exports = config;
