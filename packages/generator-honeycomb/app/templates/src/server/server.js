import HoneycombServer from 'honeycomb-server';
import HoneycombRegistryClient from 'honeycomb-registry-client';
import options from '../../.config/server';
import pkg from '../../package.json';

HoneycombServer.start(options)
  .then((server) => {
    // Register server
    HoneycombRegistryClient.register(pkg.name, server.info.host, server.info.port);
  })
  .catch((err) => {
    console.error('Error:', err); // eslint-disable-line no-console
  });
