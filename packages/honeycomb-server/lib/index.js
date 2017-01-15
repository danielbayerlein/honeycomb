const Hapi = require('hapi');
const Hoek = require('hoek');
const Joi = require('joi');

/**
 * Create a new web server
 *
 * @param  {Object}   options  Web server configuration
 * @param  {function} callback Function executed when server is started
 * @return {void}
 */
function start(options = {}, callback) {
  // Validate parameters
  Joi.assert(
    options,
    Joi.object({
      server: Joi.object(),
      connections: Joi.array().items(Joi.object()),
      plugins: Joi.array().items(Joi.object({
        module: Joi.string(),
        options: Joi.object(),
      })),
    }),
    'Invalid options'
  );

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
      register: require.main.require(plugin.module),
      options: plugin.options,
    });
  });

  // Start the web server
  server.start((err) => {
    Hoek.assert(!err, err);

    // eslint-disable-next-line no-console
    console.info('Server running at:', server.info.uri);

    // Run the callback if exists
    if (typeof callback === 'function') {
      Hoek.nextTick(callback)(server);
    }
  });
}

module.exports = {
  start,
};
