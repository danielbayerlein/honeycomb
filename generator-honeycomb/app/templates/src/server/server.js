import Hoek from 'hoek';
import Glue from 'glue';
import HoneycombRegistryClient from 'honeycomb-registry-client';
import manifest from '../../.config/server';
import pkg from '../../package.json';

Glue.compose(manifest, { relativeTo: __dirname }, (error, server) => {
  Hoek.assert(!error, error);

  server.start((startError) => {
    Hoek.assert(!startError, startError);

    const { info } = server;
    console.info('Server running at:', info.uri); // eslint-disable-line no-console

    // Register server
    HoneycombRegistryClient.register(pkg.name, info.host, info.port);
  });
});
