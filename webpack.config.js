module.exports = {
  verbose: true,
  displayErrorDetails: true,
  context: __dirname,

  entry: {
    'ng2-toastr': ['ng2-toastr.js'],
  },
  output: {
    path: './bundles',
    filename: "[name].min.js",
    sourceMapFilename: '[name].js.map',
    chunkFilename: '[id].chunk.js'
  },
  resolve: {
    cache: false,
    root: __dirname,
    extensions: ['', '.webpack.js', '.web.js', '.ts', '.js']
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
        exclude: [ /\.(spec|e2e)\.ts$/, /node_modules\/(?!(ng2-.+))/ ]
      }
    ]
  },
  noParse: [
    /zone\.js\/dist\/zone-microtask/
  ]
};