import Hoek from 'hoek';
import Glue from 'glue';
import eureka from './utils/eureka';

const manifest = require(`../../.config/server.${process.env.NODE_ENV}`);
const options = { relativeTo: __dirname };

Glue.compose(manifest, options, (error, server) => {
  Hoek.assert(!error, error);

  server.start((startError) => {
    Hoek.assert(!startError, startError);

    const { info } = server;
    console.info('Server running at:', info.uri); // eslint-disable-line no-console

    // connect to eureka
    eureka.register(info.host, info.port);
  });
});
