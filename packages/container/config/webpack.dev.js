const { merge } = require('webpack-merge') // to merge different webpack config files
const commonConfig = require('./webpack.common');

const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin')

const packageJsonDependencies = require('../package.json').dependencies;

const devConfig = {
  mode: 'development',

  // Related to PublicPath problem (if nested route -> will error, therefore define whole domain)
  output: {
    publicPath: 'http://localhost:8080/'
  },

  devServer: {
    port: 8080,
    historyApiFallback: {
      index: '/index.html'
    }
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'container', // not required, just follow convention
      remotes: {
        'marketing': 'marketing@http://localhost:8081/remoteEntry.js',
        'auth': 'auth@http://localhost:8082/remoteEntry.js'
      },
      // This is if you want to be more specific
      // Benefit is that it is highly customizable, only if you want to update it regularly
      // shared: ['react', 'react-dom'] // our MFE some uses react, other use vue

      // This is if you want webpack to take care of the shared modules deps
      // Benefit is that as you develop your app, you will add/remove module
      // Webpack will look at your deps automatically, thats why just specify packageJson Dependencies
      shared: packageJsonDependencies
    }),
  ]
}

//devConfig will override commonConfig
module.exports = merge(commonConfig, devConfig)