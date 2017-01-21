import HoneycombServer from 'honeycomb-server';
import Path from 'path';

HoneycombServer.start({
  plugins: [
    {
      module: 'honeycomb-logging-middleware',
    },
    {
      module: 'hapi-tailor-middleware',
      options: {
        templatesPath: Path.join(__dirname, '..', 'templates'),
      },
    },
  ],
});
