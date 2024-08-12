const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common'); 

const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const packageJsonDependencies = require('../package.json').dependencies

const devConfig = {
  mode: 'development',
  
  // Related to PublicPath problem (if nested route -> will error, therefore define whole domain)
  output: {
    publicPath: 'http://localhost:8082/'
  },

  devServer: {
    port: 8082,
    historyApiFallback: {
      index: '/index.html'
    }
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'auth',
      filename: 'remoteEntry.js',

      exposes: {
        './bootstrap': './src/bootstrap'
      },

      shared: {
        ...packageJsonDependencies
      }
    }),

    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
}

module.exports = merge(commonConfig, devConfig);