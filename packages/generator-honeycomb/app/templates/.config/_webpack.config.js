const path = require('path');
/* eslint-disable import/no-extraneous-dependencies */
const eslintFormatter = require('eslint-formatter-pretty');
const webpack = require('webpack');
<%_ if (includeHandlebars) { _%>
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
<%_ } _%>
/* eslint-enable import/no-extraneous-dependencies */
const Hoek = require('hoek');

const defaultConfig = {
  entry: {
    'javascripts/app': [
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
        loader: 'babel-loader!eslint-loader',
        exclude: /node_modules/,
      },
      <%_ if (includeHandlebars) { _%>
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: ['css-loader', 'postcss-loader'],
        }),
      },
      <%_ } _%>
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
        <%_ if (includeHandlebars) { _%>
        postcss: [autoprefixer()],
        <%_ } _%>
      },
    }),
    <%_ if (includeHandlebars) { _%>
    new ExtractTextPlugin('stylesheets/app.bundle.css'),
    new StyleLintPlugin({
      configFile: path.join(__dirname, '..', '.stylelintrc.yml'),
      files: ['src/**/*.css'],
    }),
    <%_ } _%>
  ],
  <%_ if (includeReact) { _%>
  // temporary workaround see https://github.com/styled-components/styled-components/issues/115
  resolve: {
    alias: {
      'styled-components$': 'styled-components/lib/index.js',
    },
  },
  <%_ } _%>
};

const developmentConfig = {
  devtool: 'eval',
  entry: {
    'javascripts/app': [
      'webpack-hot-middleware/client?reload=true&noInfo=true',
      <%_ if (includeReact) { _%>
      'react-hot-loader/patch',
      <%_ } _%>
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
