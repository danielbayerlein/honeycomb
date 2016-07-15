import Eureka from 'eureka-js-client';
import pkg from '../../../package.json';

/**
 * connect to eureka service registraction
 *
 * @param  {string} host host-address
 * @param  {[type]} port available at port
 * @return {void}
 */
function register(host, port) {
  // client configuration
  const instance = {
    port: {
      $: port,
      '@enabled': 'true',
    },
    app: pkg.name,
    hostName: host,
    vipAddress: process.env.EUREKA_VIP || host,
    statusPageUrl: `http://${host}:${port}`,
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    },
  };

  // service registry configuration
  const eureka = {
    host: process.env.EUREKA_HOST || 'localhost',
    port: process.env.EUREKA_PORT || '1111',
    servicePath: '/eureka/apps/',
  };

  const client = new Eureka({
    instance,
    eureka,
  });

  client.on('started', () => {
    console.info(`${pkg.name} registered to eureka on "${eureka.host}:${eureka.port}"`); // eslint-disable-line
  });

  client.on('deregistered', () => {
    console.info(`${pgk.name} deregistered from eureka`); // eslint-disable-line
  });

  client.start();
}


export default {
  register,
};
