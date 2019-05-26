const webpack = require('webpack');
const merge = require('webpack-merge');
const shared = require('./webpack.config.main');

module.exports = merge.smart(shared, {
  mode: 'development',
  output: {
    filename: 'electron.bundle.js',
    devtoolModuleFilenameTemplate: '[absolute-resource-path]',
  },
  devtool: 'cheap-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
  ],
});
