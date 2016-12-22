const pkg = require('../package.json');

exports.register = function register(server, options, next) {
  server.route({
    method: 'GET',
    path: '/health',
    handler: (request, reply) => {
      reply({ status: 'UP' });
    },
  });

  return next();
};

exports.register.attributes = { pkg };
