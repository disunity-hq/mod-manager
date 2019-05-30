const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const shared = require('./webpack.config.renderer');

const merge = require('webpack-merge');

module.exports = merge.smart(shared, {
  mode: 'production',
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
  ],
});
