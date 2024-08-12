const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common'); 

const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const packageJsonDependencies = require('../package.json').dependencies

const devConfig = {
  mode: 'development',
  
  // Related to PublicPath problem (if nested route -> will error, therefore define whole domain)
  output: {
    publicPath: 'http://localhost:8083/'
  },

  devServer: {
    port: 8083,
    historyApiFallback: {
      index: '/index.html'
    },
    
    // Due to our dashboard page need to load many fonts, we allow for CSP
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'dashboard',
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