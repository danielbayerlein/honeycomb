import Tailor from 'node-tailor';
import pkg from '../../package.json';

exports.register = function register(server, options, next) {
  const tailor = new Tailor(options);

  server.ext('onRequest', (request, reply) => {
    const { req, res } = request.raw;

    tailor.requestHandler(req, res, (error) => {
      if (error) {
        return reply(error);
      }

      return reply.continue();
    });
  });

  return next();
};

exports.register.attributes = {
  pkg,
};
