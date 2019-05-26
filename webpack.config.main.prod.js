const webpack = require('webpack');
const merge = require('webpack-merge');
const shared = require('./webpack.config.main');

module.exports = merge.smart(shared, {
  mode: 'production',
  output: {
    filename: 'electron.bundle.js',
  },
  node: {
    __dirname: false,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production'),
    }),
  ],
});
