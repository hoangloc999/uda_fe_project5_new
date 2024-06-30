const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const WorkboxPlugin = require('workbox-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './src/client/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    libraryTarget: 'var',
    library: 'Client',
  },
  devServer: {
    contentBase: './dist',
  },
  devtool: 'source-map',
  stats: 'verbose',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/client/view/index.html',
      filename: "./index.html"
    }),
    new CleanWebpackPlugin({
        // Simulate the removal of files
        dry: true,
        // Write Logs to Console
        verbose: true,
        // Automatically remove all unused webpack assets on rebuild
        cleanStaleWebpackAssets: true,
        protectWebpackAssets: false
    }),
    new WorkboxPlugin.GenerateSW(),
  ],
  module: {
    rules: [
        {
            test: '/\.js$/',
            exclude: /node_modules/,
            loader: "babel-loader"
        },
        {
            test: /\.scss$/,
            use: [ 'style-loader', 'css-loader', 'sass-loader' ]
        },
    ],
  },
  devServer: {
      port: 3000,
      allowedHosts: 'all'
  }
};
