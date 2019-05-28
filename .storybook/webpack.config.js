const webpack = require('webpack');

const themeVariables = require('../ant-theme-vars');

const renderer = {
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['awesome-typescript-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.(less)$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'less-loader',
            options: {
              modifyVars: themeVariables,
              javascriptEnabled: true,
            },
          },
        ],
      },
      {
        test: /styles.(css|scss)/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader?modules&camelCase=only', 'sass-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.STORYBOOK_ENV': true,
    }),
  ],
  node: {
    fs: 'empty',
  },
};

module.exports = renderer;
