import Eureka from 'eureka-js-client';
import pkg from '../../../package.json';

function register(host, port) {
  // client configuration
  const instance = {
    app: pkg.name,
    hostName: host,
    port,
  };

  // service registry configuration
  const eureka = {
    host: process.env.EUREKA_HOST || 'localhost',
    post: process.env.EUREKA_PORT || '1111',
  };

  const client = new Eureka({
    instance,
    eureka,
  });

  client.on('started', () => {
    console.info(`${pkg.name} registered to eureka on "${eureka.host}:${eureka.port}"`); // eslint-disable-line
  });

  client.start();
}


export default {
  register,
};
