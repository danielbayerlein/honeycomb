jest.mock('eureka-js-client');

const register = require('../').register;
const Eureka = require('eureka-js-client').Eureka;

describe('honeycomb-registry-client', () => {
  let client;

  beforeEach(() => {
    jest.resetAllMocks();
    client = { on: jest.fn(), start: jest.fn() };
    Eureka.mockImplementation(() => (client));
    register('test', '127.0.0.1', 3000);
  });

  it('should passed expected options to Eureka', () => {
    expect(Eureka.mock.calls[0][0]).toEqual({
      eureka: {
        host: 'localhost',
        port: '8761',
        servicePath: '/eureka/apps/',
      },
      instance: {
        app: 'test',
        dataCenterInfo: {
          '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
          name: 'MyOwn',
        },
        healthCheckUrl: 'http://127.0.0.1:3000/health',
        homePageUrl: 'http://127.0.0.1:3000/',
        hostName: '127.0.0.1',
        port: {
          '$': 3000, // eslint-disable-line quote-props
          '@enabled': 'true',
        },
        statusPageUrl: 'http://127.0.0.1:3000/info',
        vipAddress: '127.0.0.1',
      },
    });
  });

  it('should be called the start function', () => {
    expect(client.start).toHaveBeenCalled();
  });
});
