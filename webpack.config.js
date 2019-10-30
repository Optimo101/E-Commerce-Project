var path = require('path');
var webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {

  entry: ['babel-polyfill', './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'public/scripts/dist'),
    filename: 'bundle.js',
    publicPath: '/public/scripts/dist'
  },

  module: {
    rules: [
      {
        test : /\.js$/,
        use : [
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        ]
      } 
    ]
  }, 

  devServer: {
    contentBase: './views',
    hot: true
  },

  plugins: [
    new CleanWebpackPlugin()
  ]
 };