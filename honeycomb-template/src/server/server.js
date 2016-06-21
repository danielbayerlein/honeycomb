import Hapi from 'hapi';
import Hoek from 'hoek';
import Vision from 'vision';
import Inert from 'inert';
import HapiReactViews from 'hapi-react-views';
import HapiRouter from 'hapi-router';

const server = new Hapi.Server();

const serverConnection = { port: process.env.PORT || 3000 };

if (process.env.NODE_ENV !== 'production') {
  serverConnection.routes = { cors: true };
}

server.connection(serverConnection);

server.register([{
  register: Vision,
}, {
  register: Inert,
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

    console.log('Server running at:', server.info.uri);
  });
});
