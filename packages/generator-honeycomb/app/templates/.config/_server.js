const path = require('path');
const Hoek = require('hoek');
const webpackConfig = require('./webpack.config');
const pkg = require('../package.json');

const viewEngines = {
  <%_ if (includePreact) { _%>
  js: 'hapi-preact-views',
  <%_ } _%>
  <%_ if (includeHandlebars) { _%>
  html: 'handlebars',
  <%_ } _%>
};

const compileOptions = {
  <%_ if (includeHandlebars) { _%>
  doctype: '',
  <%_ } _%>
};

/**
 * Read the server.info from the request and pass the uri to the template.
 *
 * @param  {object} request incoming request
 * @return {object}         template variable
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
      host: process.env.HOST,
      address: process.env.HOST_IP || '0.0.0.0',
      port: parseInt(process.env.PORT, 10) || <%= port %>,
    },
  ],
  plugins: [
    { module: 'vision' },
    { module: 'inert' },
    { module: 'honeycomb-logging-middleware' },
    { module: 'honeycomb-health-middleware' },
    { module: 'honeycomb-status-middleware' },
    {
      module: 'honeycomb-info-middleware',
      options: {
        pkg,
        process,
      },
    },
  ],
};

const developmentConfig = {
  plugins: [
    {
      module: 'hapi-router',
      options: {
        routes: 'src/server/routes/*.js',
      },
    },
    {
      module: '@danielbayerlein/hapi-webpack-middleware',
      options: {
        webpack: webpackConfig,
        webpackDev: {
          noInfo: true,
          publicPath: webpackConfig.output.publicPath,
        },
      },
    },
    {
      module: 'visionary',
      options: {
        compileOptions,
        context: contextFunc,
        engines: viewEngines,
        path: 'views',
        relativeTo: path.resolve(__dirname, '../src/server'),
      },
    },
  ],
};

const productionConfig = {
  plugins: [
    {
      module: 'hapi-router',
      options: {
        routes: 'dist/server/routes/*.js',
      },
    },
    {
      module: 'visionary',
      options: {
        compileOptions,
        context: contextFunc,
        engines: viewEngines,
        path: 'views',
        relativeTo: path.resolve(__dirname, '../dist/server'),
      },
    },
  ],
};

module.exports = Hoek.merge(
  defaultConfig,
  process.env.NODE_ENV === 'development' ? developmentConfig : productionConfig
);
