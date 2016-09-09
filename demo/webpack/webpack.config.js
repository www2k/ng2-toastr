var path = require('path');

module.exports = {
  entry: {
    app: './app/boot.ts',
  },
  output: {
    filename: "bundle.js",
  },
  devtool: '#source-map',
  resolve: {
    extensions: ['', '.ts', '.js'],
  },
  module: {
    loaders: [
      { test: /\.ts$/,
        loader: 'ts-loader',
      },

      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
    ]
  },
};