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
      'alloy-scss': '@ksf/alloy/scss/alloy.scss',
      'alloy-css': '@ksf/alloy/css/alloy.css',
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
      loader: 'style-loader!css-loader'
    }, {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: ExtractTextPlugin.extract({
        use: ['css-loader', 'sass-loader', 'resolve-url-loader']
      })
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
      filename: './styles/bundle.css',
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
    })
  ]
};

module.exports = config;