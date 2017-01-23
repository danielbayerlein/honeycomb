const Hapi = require('hapi');
const Joi = require('joi');

// Schema object for Joi
const schema = Joi.object({
  server: Joi.object(),
  connections: Joi.array().items(Joi.object()),
  plugins: Joi.array().items(Joi.object({
    module: Joi.string(),
    options: Joi.object(),
  })),
});

/**
 * Create a new web server
 *
 * @param  {Object}   options  Web server configuration
 * @param  {function} callback Function executed when server is started
 * @return {void}
 */
function start(options = {}) {
  // Validate parameters
  Joi.assert(options, schema, 'Invalid options');

  // Set defaults
  const serverOptions = options.server || {};
  const plugins = options.plugins || [];
  const connections = options.connections || [{
    host: process.env.HOST,
    address: process.env.HOST_IP || '0.0.0.0',
    port: parseInt(process.env.PORT, 10) || 3000,
  }];

  // Create hapi.js server instance
  const server = new Hapi.Server(serverOptions);

  // Set connections
  connections.forEach(connection => server.connection(connection));

  // Register plugins
  plugins.forEach((plugin) => {
    server.register({
      // When a file is run directly from Node.js, require.main is set to its module.
      // require.main will be undefined if there is no entry script.
      // https://gist.github.com/branneman/8048520#7-the-wrapper
      // eslint-disable-next-line global-require, import/no-dynamic-require
      register: require.main ? require.main.require(plugin.module) : require(plugin.module),
      options: plugin.options,
    });
  });

  // Return a Promise
  return server.start()
    .then(() => {
      // eslint-disable-next-line no-console
      console.info('Server running at:', server.info.uri);
      return server;
    }).catch(() => {
      // eslint-disable-next-line no-console
      console.error('There was an error starting the server');
      return server.stop();
    });
}

module.exports = {
  start,
};
