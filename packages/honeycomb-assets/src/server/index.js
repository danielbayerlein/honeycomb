import Hapi from 'hapi';
import Hoek from 'hoek';
import logging from 'honeycomb-logging-middleware';
import info from 'honeycomb-info-middleware';
import health from 'honeycomb-health-middleware';
import status from 'hapijs-status-monitor';
import pkg from '../../package.json';

const server = new Hapi.Server();

server.connection({
  port: process.env.PORT || 3001,
});

server.register([
  { register: logging },
  { register: health },
  {
    register: info,
    options: {
      pkg,
      process,
    },
  },
  {
    register: status,
    options: {
      title: 'Status',
    },
  },
], (registerError) => {
  Hoek.assert(!registerError, registerError);

  server.start((startError) => {
    Hoek.assert(!startError, startError);
    console.info('Server running at:', server.info.uri); // eslint-disable-line no-console
  });
});
