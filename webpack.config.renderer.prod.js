const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const shared = require('./webpack.config.renderer');

const merge = require('webpack-merge');

module.exports = merge.smart(shared, {
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              camelCase: 'only',
              // exportOnlyLocals: true,
              // importLoaders: 1,
              // hashPrefix: 'hash', // Helps prevent naming collisions
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: '[id].[hash].css',
    }),
  ],
});
