const path = require('path');
const logConfig = require('./log');
const webpackConfig = require('./webpack.config');
const Hoek = require('hoek');

const defaultConfig = {
  connections: [
    {
      port: process.env.PORT || 3000,
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
  ],
};

const developmentConfig = {
  registrations: [
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
            html: 'handlebars',
          },
          path: 'views',
          relativeTo: path.resolve(__dirname, '../src/server'),
        },
      },
    },
  ],
};

const productionConfig = {
  registrations: [
    {
      plugin: {
        register: 'hapi-router',
        options: {
          routes: 'dist/server/routes/*.js',
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
            html: 'handlebars',
          },
          path: 'views',
          relativeTo: path.resolve(__dirname, '../dist/server'),
        },
      },
    },
  ],
};

module.exports = Hoek.merge(
  defaultConfig,
  process.env.NODE_ENV === 'development' ? developmentConfig : productionConfig
);
