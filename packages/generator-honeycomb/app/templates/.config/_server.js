const path = require('path');
const Hoek = require('hoek');
const webpackConfig = require('./webpack.config');
const pkg = require('../package.json');

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
  layoutPath: path.resolve(__dirname, '../src/server/views/layouts'),
  renderMethod: 'renderToString',
  <%_ } _%>
};

const compileOptionsProduction = Object.assign({}, compileOptionsDevelopment);
<%_ if (includeReact) { _%>
compileOptionsProduction.layoutPath = path.resolve(__dirname, '../dist/server/views/layouts');
<%_ } _%>

/**
 * reads the server-info from the request
 * and pass the uri to the template.
 *
 * @param  {object} request incoming request
 * @return {object}         template-variable
 */
function contextFunc(request) {
  const info = request.server.info;

  return {
    baseUrl: process.env.FRAGMENT_URL || `${info.protocol}://${info.address}:${info.port}`,
    serviceName: pkg.name,
  };
}

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
      plugin: 'honeycomb-logging-middleware',
    },
    {
      plugin: {
        register: 'hapijs-status-monitor',
        options: {
          title: 'Status',
        },
      },
    },
    {
      plugin: 'honeycomb-health-middleware',
    },
    {
      plugin: {
        register: 'honeycomb-info-middleware',
        options: {
          pkg,
          process,
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
          context: contextFunc,
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
          context: contextFunc,
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
