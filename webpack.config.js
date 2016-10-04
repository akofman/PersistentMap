const webpack = require('webpack');
// This helps ensure the builds are consistent if source hasn't changed:
const occurrenceOrderPlugin = new webpack.optimize.OccurrenceOrderPlugin();
const dedupePlugin = new webpack.optimize.DedupePlugin();
// Try to dedupe duplicated modules, if any:
const definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.NODE_ENV === 'development' || 'false')),
  'process.env': {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'production')
  }
});
// Minify the code.
const uglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
  sourceMap: true,
  compress: {
    warnings: false
  },
  output: {
    comments: false
  }
});

module.exports = {
  // Don't attempt to continue if there are any errors.
  bail: true,
  entry: [
    './src'
  ],
  devtool: 'source-map',
  output: {
    path: 'dist',
    filename: 'PersistentMap.js',
    libraryTarget: 'umd'
  },
  module: {
    loaders: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        loader: 'babel'
      }
    ]
  },
  plugins: [
    definePlugin,
    occurrenceOrderPlugin,
    dedupePlugin,
    uglifyJsPlugin
  ]
};
