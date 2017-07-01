var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    "./src/components/Calculator"
  ],
  output: {
    path: path.join(__dirname, 'build'),
    filename: "bundle.js",
    publicPath: '/build/'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.js|\.jsx?/,
        loaders: ['babel'],
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.css|\.less$/,
        loader: "style-loader!css-loader!less-loader"
      }
    ]
    // require('style.less')
    // --> <link ...
  }
};
