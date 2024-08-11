module.exports = {
  module: {
    // Define a loader, tell webpack to process some different files as we import them to our project.
    rules: [
      // * Config babel for a loader
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            // Babel React Preset will transform from jsx to ES5.
            // Babel Preset ENV will transform all code and convert to ES5.
            presets: ['@babel/preset-react', '@babel/preset-env'],
            // Add another features (async, await)
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  }
}