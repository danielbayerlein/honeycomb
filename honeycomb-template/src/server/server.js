import Hoek from 'hoek';
import Glue from 'glue';
import manifest from '../../.config/server';

Glue.compose(manifest, { relativeTo: __dirname }, (error, server) => {
  Hoek.assert(!error, error);

  server.start((startError) => {
    Hoek.assert(!startError, startError);
    console.log('Server running at:', server.info.uri); // eslint-disable-line no-console
  });
});
