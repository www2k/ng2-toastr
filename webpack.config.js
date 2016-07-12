var path = require('path');

module.exports = {
  entry: {
    'ng2-toastr': './ng2-toastr.ts',
  },
  output: {
    path: './bundles',
    filename: "[name].js",
    sourceMapFilename: '[name].js.map'
  },
  devtool: '#source-map',
  resolve: {
    extensions: ['', '.ts', '.js'],
  },
  module: {
    loaders: [
      { test: /\.ts$/,
        loader: 'ts-loader',
        query: {
          compilerOptions: {
            removeComments: true,
            noEmitHelpers: false
          }
        },
        exclude: [ /\.(spec|e2e)\.ts$/,
          './node_modules/rxjs',
          './node_modules/@angular',
          './node_modules/angular2-in-memory-web-api',
        ],
      },

      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
    ]
  },
};