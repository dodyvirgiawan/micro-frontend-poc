const { merge } = require('webpack-merge') // to merge different webpack config files
const commonConfig = require('./webpack.common');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

const packageJsonDependencies = require('../package.json').dependencies;

const devConfig = {
  mode: 'development',
  devServer: {
    port: 8080,
    historyApiFallback: {
      index: 'index.html'
    }
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container', // not required, just follow convention
      remotes: {
        'marketing': 'marketing@http://localhost:8081/remoteEntry.js'
      },
      // This is if you want to be more specific
      // Benefit is that it is highly customizable, only if you want to update it regularly
      // shared: ['react', 'react-dom'] // our MFE some uses react, other use vue

      // This is if you want webpack to take care of the shared modules deps
      // Benefit is that as you develop your app, you will add/remove module
      // Webpack will look at your deps automatically, thats why just specify packageJson Dependencies
      shared: packageJsonDependencies
    }),

    new HtmlWebpackPlugin({
      template: './public/index.html'
    })
  ]
}

//devConfig will override commonConfig
module.exports = merge(commonConfig, devConfig)