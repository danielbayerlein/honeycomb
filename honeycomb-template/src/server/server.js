import Hapi from 'hapi';
import Hoek from 'hoek';
import Vision from 'vision';
import Inert from 'inert';
import HapiReactViews from 'hapi-react-views';
import HapiRouter from 'hapi-router';
import WebpackPlugin from '@danielbayerlein/hapi-webpack-middleware';
import WebpackConfig from '../../.config/webpack.config';
import eureka from './utils/eureka';

const server = new Hapi.Server();

const serverConnection = {
  port: process.env.PORT || 3000,
  routes: {
    cors: process.env.NODE_ENV === 'development',
  },
};

server.connection(serverConnection);

server.register([{
  register: Vision,
}, {
  register: Inert,
}, {
  register: WebpackPlugin,
  options: {
    webpack: WebpackConfig,
    webpackDev: {
      noInfo: true,
      publicPath: WebpackConfig.output.publicPath,
    },
  },
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

    const { info } = server;
    console.log('Server running at:', server.uri);

    // connect to eureka
    eureka.register(info.host, info.port);
  });
});
