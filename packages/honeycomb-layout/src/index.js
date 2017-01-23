import honeycombServer from 'honeycomb-server';
import path from 'path';

honeycombServer.start({
  plugins: [
    {
      module: 'honeycomb-logging-middleware',
    },
    {
      module: 'hapi-tailor-middleware',
      options: {
        templatesPath: path.join(__dirname, '..', 'templates'),
      },
    },
  ],
});
