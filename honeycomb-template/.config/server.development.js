const path = require('path');
const webpackConfig = require('./webpack.config');
const logConfig = require('./log');

module.exports = {
  connections: [
    {
      port: process.env.PORT || 3000,
      routes: {
        cors: true,
      },
    },
  ],
  registrations: [
    {
      plugin: 'vision',
    },
    {
      plugin: 'inert',
    },
    {
      plugin: {
        register: 'good',
        options: logConfig,
      },
    },
    {
      plugin: {
        register: 'hapi-router',
        options: {
          routes: 'src/server/routes/*.js',
        },
      },
    },
    {
      plugin: {
        register: '@danielbayerlein/hapi-webpack-middleware',
        options: {
          webpack: webpackConfig,
          webpackDev: {
            noInfo: true,
            publicPath: webpackConfig.output.publicPath,
          },
        },
      },
    },
    {
      plugin: {
        register: 'visionary',
        options: {
          compileOptions: {
            doctype: '',
          },
          engines: {
            jsx: 'hapi-react-views',
          },
          path: 'views',
          relativeTo: path.resolve(__dirname, '../src/server'),
        },
      },
    },
  ],
};
