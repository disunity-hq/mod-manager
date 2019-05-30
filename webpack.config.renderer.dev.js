const path = require('path');
const { spawn } = require('child_process');
const merge = require('webpack-merge');
const webpack = require('webpack');
const WebpackShellPlugin = require('webpack-shell-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const shared = require('./webpack.config.renderer');

module.exports = merge.smart(shared, {
  mode: 'development',
  devServer: {
    contentBase: path.resolve('./dist'),
    port: 9000,
    after() {
      spawn('electron', ['./dist/electron.bundle.js'], {
        shell: true,
        env: process.env,
        stdio: 'inherit',
      })
        .on('close', code => process.exit(0))
        .on('error', spawnError => console.error(spawnError));
    },
  },
  devtool: 'source-map',
  plugins: [
    new WebpackShellPlugin({ onBuildStart: ['yarn build:style-typings'], dev: false }),
    new webpack.WatchIgnorePlugin([/\.(css|scss)\.d\.ts$/]),
    new webpack.HotModuleReplacementPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],

  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
});
