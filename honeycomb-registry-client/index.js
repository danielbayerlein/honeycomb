const Eureka = require('eureka-js-client').Eureka;

/**
 * Connect to Eureka service registry
 *
 * @param  {string} name of the server
 * @param  {string} host of the server
 * @param  {number} port of the server
 * @return {void}
 */
function register(name, host, port) {
  const instance = {
    port: {
      $: port,
      '@enabled': 'true',
    },
    app: name,
    hostName: host,
    vipAddress: process.env.EUREKA_VIP || host,
    statusPageUrl: `http://${host}:${port}`,
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    },
  };

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
    console.info(`${name} registered to eureka on "${eureka.host}:${eureka.port}"`); // eslint-disable-line
  });

  client.on('deregistered', () => {
    console.info(`${name} deregistered from eureka`); // eslint-disable-line
  });

  client.start();
}

module.exports = {
  register,
};
