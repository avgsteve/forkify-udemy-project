/*jshint esversion: 6 */

const path = require('path');

// https://webpack.js.org/concepts/
module.exports = {
  entry: './src/js/index.js',
  output: {
    path: path.resolve(__dirname, 'dist/js'), //__dirname refers to current folder where this config.js is located
    filename: 'bundle.js'
  },
};
