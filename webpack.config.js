/*jshint esversion: 6 */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// https://webpack.js.org/concepts/
module.exports = {
  entry: ['babel-polyfill', './src/js/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'), //__dirname refers to current folder where this config.js is located
    filename: 'js/bundle.js'
  },
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new HtmlWebpackPlugin({
      //讓src folder的html檔案可以自動複製一份新的copy到dist folder裡面
      filename: 'index.html',
      template: './src/index.html'
    })
  ],
  module: {
    rules: [{
      test: /\.js$/, // to test all files ending with .js
      exclude: /node_modules/, // to exclude node_modules folder and all its files
      use: {
        loader: 'babel-loader' // to use babel-loader to process files, will need to create babel config file (.babelrc)
      }
    }]
  },
};
