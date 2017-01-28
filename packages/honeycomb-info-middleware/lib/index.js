const pkg = require('../package.json');

exports.register = function register(server, options, next) {
  server.route({
    method: 'GET',
    path: '/admin/info',
    handler: (request, reply) => {
      reply({
        name: options.pkg.name,
        version: options.pkg.version,
        description: options.pkg.description,
        author: options.pkg.author,
        contributors: options.pkg.contributors,
        env: options.process.env.NODE_ENV,
        uptime: options.process.uptime(),
        memory: options.process.memoryUsage(),
        cpu: options.process.cpuUsage(),
        node: options.process.version,
      });
    },
  });

  return next();
};

exports.register.attributes = { pkg };
