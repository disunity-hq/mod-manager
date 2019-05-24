const main = {
  entry: './src/process/index.ts',
  target: 'electron-main',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.jsx', '.json']
  }
};

module.exports = main;
