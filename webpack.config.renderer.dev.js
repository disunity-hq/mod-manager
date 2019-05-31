const path = require('path');
const { spawn } = require('child_process');
const merge = require('webpack-merge');
const webpack = require('webpack');
const exec = require('child_process').exec;
const WebpackShellPlugin = require('webpack-shell-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const shared = require('./webpack.config.renderer');

module.exports = merge.smart(shared, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(css|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true,
              reloadAll: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              camelCase: 'only',
              localIdentName: '[path][name]__[local]--[hash:base64:5]',
              // importLoaders: 1,
              // hashPrefix: 'hash', // Helps prevent naming collisions
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
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
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.WatchIgnorePlugin([/\.(css|scss)\.d\.ts$/]),
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    {
      apply: compiler => {
        compiler.hooks.compilation.tap('BuildStyleTypings', compilation => {
          exec('yarn build:style-typings', (err, stdout, stderr) => {
            if (stdout) process.stdout.write(stdout);
            if (stderr) process.stderr.write(stderr);
          });
        });
      },
    },
  ],

  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
    },
  },
});
