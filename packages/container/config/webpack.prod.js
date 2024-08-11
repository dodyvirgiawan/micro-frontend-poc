const { merge } = require('webpack-merge')
const commonConfig = require('./webpack.common');

const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');

const packageJsonDependencies = require('../package.json').dependencies;

// Related to build time MFE discovery
const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: 'production', // will minify the bundle, and other optimizations

  output: {
    // ! this content hash is useful because will change evry deployment, can act as way to notify AWS cloudfront that this is a new file -> therefore invalidate the cache
    // --> this is for the case for javascript file
    // --> for the case of index.html file, we need to automate it via the container github action workflow
    filename: '[name].[contenthash].js',
    
    // ! override default JS behaviour when trying load a script tag, we want webpack to specify this path as well before the filename (must be same with our S3 bucket location, where we specify in GitHub action AWS CLI)
    publicPath: '/container/latest/', 
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'container',

      remotes: {
        // Since this is a production, we need to specify where each MFE will be deployed to
        marketing: `marketing@${domain}/marketing/remoteEntry.js` // for now this /marketing is big assumption.
      },

      shared: {
        ...packageJsonDependencies,
        // If you want to override a specific (ex. like making extra sure react use singleton loading) just enter below this
      }
    })
  ]
}

module.exports = merge(commonConfig, prodConfig)