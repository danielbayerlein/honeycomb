const good = require('good');
const pkg = require('../package.json');

exports.register = function register(server, options, next) {
  server.register({
    register: good,
    options: {
      ops: false,
      reporters: {
        console: [{
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [{ response: '*' }],
        }, {
          module: 'good-console',
        }, 'stdout'],
      },
    },
  });

  return next();
};

exports.register.attributes = { pkg };
