const path = require('path');
/* eslint-disable import/no-extraneous-dependencies */
const eslintFormatter = require('eslint-formatter-pretty');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
/* eslint-enable import/no-extraneous-dependencies */
const Hoek = require('hoek');
const serviceName = require('../package.json').name;

const defaultConfig = {
  entry: {
    [`javascripts/${serviceName}`]: [
      './src/client/client.js',
    ],
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '..', 'public'),
    publicPath: '/',
  },
  context: path.resolve(__dirname, '..'),
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader'],
        }),
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.LoaderOptionsPlugin({
      options: {
        eslint: {
          formatter: eslintFormatter,
        },
        postcss: [autoprefixer()],
      },
    }),
    new ExtractTextPlugin(`stylesheets/${serviceName}.bundle.css`),
    new StyleLintPlugin({
      configFile: path.join(__dirname, '..', '.stylelintrc.yml'),
      files: ['src/**/*.css'],
    }),
  ],
};

const developmentConfig = {
  devtool: 'eval',
  entry: {
    [`javascripts/${serviceName}`]: ['webpack-hot-middleware/client?reload=true&noInfo=true'],
  },
  output: {
    pathinfo: true,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
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
  <%_ if (includePreact) { _%>
  externals: {
    // Assets from honeycomb-assets
    preact: 'preact',
  },
  <%_ } _%>
};

module.exports = Hoek.merge(
  process.env.NODE_ENV === 'development' ? developmentConfig : productionConfig,
  defaultConfig
);
