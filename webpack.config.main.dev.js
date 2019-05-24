const path = require('path');
const webpack = require('webpack');
const shared = require('./webpack.config.main');

const main = {
  mode: 'development',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'electron.bundle.js',
    devtoolModuleFilenameTemplate: '[absolute-resource-path]'
  },
  devtool: 'cheap-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    })
  ]
};

module.exports = { ...shared, ...main };
