const hapijsStatusMonitor = require('hapijs-status-monitor');
const pkg = require('../package.json');

exports.register = function register(server, options, next) {
  const title = options.title || 'Status';
  const path = '/admin/status';

  server.register({
    register: hapijsStatusMonitor,
    options: { title, path },
  });

  return next();
};

exports.register.attributes = { pkg };
