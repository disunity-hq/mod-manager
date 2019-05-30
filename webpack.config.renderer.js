const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const themeVariables = require('./ant-theme-vars');

const devMode = process.env.NODE_ENV !== 'production';

const renderer = {
  entry: './src/renderer/index.tsx',
  target: 'electron-renderer',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /(?!\.stories|\.spec)\.tsx?$/,
        loader: 'awesome-typescript-loader',
        options: {
          useBabel: true,
          useCache: true,
          babelCore: '@babel/core',
        },
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
          {
            loader: MiniCssExtractPlugin.loader,
          },
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
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/src/renderer/index.html',
    }),
  ],
};

module.exports = renderer;
