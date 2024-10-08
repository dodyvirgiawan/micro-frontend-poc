const { merge } = require('webpack-merge') // to merge different webpack config files
const commonConfig = require('./webpack.common');

const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const packageJsonDependencies = require('../package.json').dependencies;

const devConfig = {
  mode: 'development',
  
  // Related to PublicPath problem (if nested route -> will error, therefore define whole domain)
  output: {
    publicPath: 'http://localhost:8081/'
  },

  devServer: {
    port: 8081,
    historyApiFallback: {
      index: '/index.html'
    }
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'marketing', // global variable name that will be loaded in container
      filename: 'remoteEntry.js',
      exposes: {
        './bootstrap': './src/bootstrap'
      },
      // If want specific
      // shared: ['react', 'react-dom'] // since our container use react.

      // If want automatic
      shared: packageJsonDependencies
    }),

    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
}

//devConfig will override commonConfig
module.exports = merge(commonConfig, devConfig)