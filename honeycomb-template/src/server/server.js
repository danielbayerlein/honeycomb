import Hoek from 'hoek';
import Glue from 'glue';

const manifest = require(`../../.config/server.${process.env.NODE_ENV}`);
const options = { relativeTo: __dirname };

Glue.compose(manifest, options, (error, server) => {
  Hoek.assert(!error, error);

  server.start((startError) => {
    Hoek.assert(!startError, startError);
    console.log('Server running at:', server.info.uri); // eslint-disable-line no-console
  });
});
