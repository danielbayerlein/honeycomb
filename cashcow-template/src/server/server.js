const Hapi = require('hapi');
const Hoek = require('hoek');
const Vision = require('vision');
const HapiReactViews = require('hapi-react-views');
const HapiRouter = require('hapi-router');

require('babel-core/register');

const server = new Hapi.Server();

server.connection({ port: process.env.PORT || 3000 });

server.register([{
  register: Vision,
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
