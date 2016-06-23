import Hapi from 'hapi';
import Hoek from 'hoek';
import Vision from 'vision';
import Inert from 'inert';
import good from 'good';
import HapiReactViews from 'hapi-react-views';
import HapiRouter from 'hapi-router';
import logConfig from '../../.config/log';

const server = new Hapi.Server();

server.connection({ port: process.env.PORT || 3000 });

server.register([{
  register: Vision,
}, {
  register: Inert,
},
{
  register: good,
  options: logConfig,
}, {
  register: HapiRouter,
  options: {
    routes: 'src/server/routes/**/*.js',
  },
}], (registerError) => {
  Hoek.assert(!registerError, registerError);

  server.views({
    engines: {
      jsx: HapiReactViews,
    },
    compileOptions: {
      doctype: '',
    },
    relativeTo: __dirname,
    path: 'views',
  });

  server.start((startError) => {
    Hoek.assert(!startError, startError);

    console.info('Server running at:', server.info.uri); // eslint-disable-line no-console
  });
});
