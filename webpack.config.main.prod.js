const path = require('path');
const webpack = require('webpack');
const shared = require('./webpack.config.main');

const main = {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'electron.bundle.js'
  },
  node: {
    __dirname: false
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
};

module.exports = { ...shared, ...main };
