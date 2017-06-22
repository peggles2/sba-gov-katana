var path = require('path');
var webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const sharedConfig = require('./webpack.config.shared.js');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = function(env) {
  return webpackMerge(sharedConfig(), {
    devtool: 'eval',
    entry: [
      'babel-polyfill',
      'react-hot-loader/patch',
      'webpack-hot-middleware/client',
      'bootstrap-loader',
      './src/client/components/entry-dev.jsx'
    ],
    output: {
      path: path.join(__dirname, 'public', "build"),
      filename: 'bundle.js',
      publicPath: '/build/'
    },
    plugins: [
      new BundleAnalyzerPlugin(),
      new webpack.HotModuleReplacementPlugin(),
    ],
    module: {
      rules: [{
        test: /\.(png|jpg|gif|woff|woff2|ttf|otf|eot|svg)$/,
        loader: 'file-loader?name=img/img-[hash:6].[ext]'
      }]
    }
  });
};
