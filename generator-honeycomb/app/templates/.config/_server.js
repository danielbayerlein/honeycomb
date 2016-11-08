const path = require('path');
const logConfig = require('./log');
const webpackConfig = require('./webpack.config');
const Hoek = require('hoek');

const viewEngines = {
  <%_ if (includeReact) { _%>
  js: 'hapi-react-views',
  <%_ } _%>
  <%_ if (includeHandlebars) { _%>
  html: 'handlebars',
  <%_ } _%>
};

const compileOptionsDevelopment = {
  doctype: '',
  <%_ if (includeReact) { _%>
  layout: 'default',
  layoutPath: path.resolve(__dirname, '../src/server/views/layout'),
  renderMethod: 'renderToString',
  <%_ } _%>
};

const compileOptionsProduction = Object.assign({}, compileOptionsDevelopment);
<%_ if (includeReact) { _%>
compileOptionsProduction.layoutPath = path.resolve(__dirname, '../dist/server/views/layout');
<%_ } _%>

const defaultConfig = {
  connections: [
    {
      port: process.env.PORT || <%= port %>,
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
        register: 'hapijs-status-monitor',
        options: {
          title: 'Status',
        },
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
          compileOptions: compileOptionsDevelopment,
          engines: viewEngines,
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
          compileOptions: compileOptionsProduction,
          engines: viewEngines,
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
