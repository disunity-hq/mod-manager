const webpack = require("webpack");
module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "awesome-typescript-loader"
          },
          {
            loader: "react-docgen-typescript-loader"
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif)$/,
        use: [
          {
            loader: "file-loader"
          }
        ]
      },
      {
        test: /\.(css|scss)$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env.STORYBOOK_ENV": true
    })
  ],
  node: {
    fs: "empty"
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"]
  }
};
