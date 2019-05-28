const webpack = require('webpack');
const WebpackShellPlugin = require('webpack-shell-plugin');

const themeVariables = require('../ant-theme-vars');

const renderer = {
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
      // {
      //   test: /\.(css|scss)$/,
      //   use: ['style-loader', 'css-loader?modules&camelCase=only', 'sass-loader'],
      // },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.STORYBOOK_ENV': true,
    }),
    new WebpackShellPlugin({ onBuildStart: ['yarn build:style-typings'], dev: false }),
    new webpack.WatchIgnorePlugin([/\.(css|scss)\.d\.ts$/]),
  ],
  node: {
    fs: 'empty',
  },
};

module.exports = renderer;
