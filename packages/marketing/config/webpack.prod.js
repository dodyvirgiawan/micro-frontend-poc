const { merge } = require('webpack-merge');
const commonConfig = require('./webpack.common');

const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const packageJsonDependencies = require('../package.json').dependencies;

const prodConfig = {
  mode: 'production',

  output: {
    filename: '[name].[contenthash].js'
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'marketing',
      filename: 'remoteEntry.js',

      exposes: {
        './bootstrap': './src/bootstrap.js'
      },

      shared: {
        ...packageJsonDependencies
      }
    })
  ]
}

module.exports = merge(commonConfig, prodConfig);