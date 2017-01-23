import honeycombServer from 'honeycomb-server';
import honeycombRegistryClient from 'honeycomb-registry-client';
import options from '../../.config/server';
import pkg from '../../package.json';

honeycombServer.start(options)
  .then((server) => {
    // Register server
    honeycombRegistryClient.register(pkg.name, server.info.host, server.info.port);
  })
  .catch((err) => {
    console.error('Error:', err); // eslint-disable-line no-console
  });
