const path = require('path');
const eslintFormatter = require('eslint-formatter-pretty');
const webpack = require('webpack');
const env = {
  production: process.env.NODE_ENV === 'production',
  development: process.env.NODE_ENV === 'development',
  current: process.env.NODE_ENV,
};

module.exports = {
  entry: {
    'app': [
      'webpack-hot-middleware/client?reload=true&noInfo=true',
      'react-hot-loader/patch',
      path.resolve(__dirname, '../src/client/client.js'),
    ],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../public/javascripts'),
    publicPath: '/javascripts/',
    pathinfo: env.development,
  },
  context: path.resolve(__dirname, '..'),
  devtool: env.production ? 'source-map' : 'eval',
  bail: env.production,
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel!eslint',
        exclude: /node_modules/,
      }, {
        test: /\.css$/,
        loader: 'style!css',
      },
    ],
  },
  eslint: {
    formatter: eslintFormatter,
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(env.current),
      }
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
};
