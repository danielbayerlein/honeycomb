const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const postcssImport = require('postcss-import');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  entry: {
    assets: path.resolve(__dirname, 'src', 'client', 'assets.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist', 'client'),
    publicPath: '/',
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        // ExtractTextPlugin currently doesn't support the newer use
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: ['css-loader', 'postcss-loader'],
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin('assets.bundle.css'),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new StyleLintPlugin({
      configFile: path.join(__dirname, '.stylelintrc.yml'),
      files: ['src/**/*.css'],
    }),
    new webpack.LoaderOptionsPlugin({
      options: {
        postcss: [postcssImport(), autoprefixer()],
      },
    }),
  ],
};

module.exports = config;
