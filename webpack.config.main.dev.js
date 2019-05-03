const path = require("path");
const webpack = require("webpack");
const process = require("process");
const main = {
  entry: "./src/process/index.ts",
  mode: "development",
  target: "electron-main",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "electron.bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify("development")
    })
  ]
};

module.exports = main;
