const WebpackConfig = require('./webpack.config');
const Confidence = require('confidence');
const Hoek = require('hoek');
const path = require('path');

const master = {
  connections: [
    {
      $filter: 'env',
      $base: {
        port: 3000,
      },
      development: {
        routes: {
          cors: true,
        },
      },
      production: {}
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
        register: 'hapi-router',
        options: {
          $filter: 'env',
          development: {
            routes: 'src/server/routes/*.js',
          },
          production: {
            routes: 'dist/server/routes/*.js',
          },
        },
      },
    },
    {
      plugin: {
        register: 'visionary',
        options: {
          $filter: 'env',
          $base: {
            compileOptions: {
              doctype: '',
            },
            path: 'views',
          },
          development: {
            engines: {
              jsx: 'hapi-react-views',
            },
            relativeTo: path.resolve(__dirname, '../src/server'),
          },
          production: {
            engines: {
              js: 'hapi-react-views',
            },
            relativeTo: path.resolve(__dirname, '../dist/server'),
          },
        },
      },
    },
  ],
};

const store = new Confidence.Store(master);
let manifest = store.get('/', { env: process.env.NODE_ENV });

// Workaround, see https://github.com/hapijs/confidence/issues/22
if (process.env.NODE_ENV === 'development') {
  const registerHapiWebpackMiddleware = {
    registrations: [
      {
        plugin: {
          register: '@danielbayerlein/hapi-webpack-middleware',
          options: {
            webpack: WebpackConfig,
            webpackDev: {
              noInfo: true,
              publicPath: WebpackConfig.output.publicPath,
            },
          },
        },
      },
    ],
  };

  manifest = Hoek.merge(registerHapiWebpackMiddleware, manifest);
}

module.exports = manifest;
