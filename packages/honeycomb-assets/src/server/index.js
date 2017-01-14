import Hapi from 'hapi';
import Hoek from 'hoek';
import inert from 'inert';
import path from 'path';
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
  { register: inert },
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

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: path.resolve(__dirname, '..', 'client'),
      },
    },
  });

  server.start((startError) => {
    Hoek.assert(!startError, startError);
    console.info('Server running at:', server.info.uri); // eslint-disable-line no-console
  });
});
