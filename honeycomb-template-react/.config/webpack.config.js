const path = require('path');
const eslintFormatter = require('eslint-formatter-pretty');
const webpack = require('webpack');
const Hoek = require('hoek');

const defaultConfig = {
  entry: {
    app: [
      './src/client/client.jsx',
    ],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../public/javascripts'),
    publicPath: '/javascripts/',
  },
  context: path.resolve(__dirname, '..'),
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
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
  ],
};

const developmentConfig = {
  devtool: 'eval',
  entry: {
    app: [
      'webpack-hot-middleware/client?reload=true&noInfo=true',
      'react-hot-loader/patch',
    ],
  },
  output: {
    pathinfo: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
};

const productionConfig = {
  bail: true,
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
    }),
  ],
};

module.exports = Hoek.merge(
  process.env.NODE_ENV === 'development' ? developmentConfig : productionConfig,
  defaultConfig
);
