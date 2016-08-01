import Hoek from 'hoek';
import Glue from 'glue';
import eureka from './utils/eureka';
import manifest from '../../.config/server';

Glue.compose(manifest, { relativeTo: __dirname }, (error, server) => {
  Hoek.assert(!error, error);

  server.start((startError) => {
    Hoek.assert(!startError, startError);

    const { info } = server;
    console.info('Server running at:', info.uri); // eslint-disable-line no-console

    // connect to eureka
    eureka.register(info.host, info.port);
  });
});
