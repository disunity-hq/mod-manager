const path = require("path");
const webpack = require("webpack");
const main = {
  entry: "./src/process/index.ts",
  mode: "production",
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
  node: {
    __dirname: false
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify("production")
    })
  ]
};

module.exports = main;
