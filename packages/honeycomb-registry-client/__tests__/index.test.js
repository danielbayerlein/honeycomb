jest.mock('eureka-js-client');

const register = require('../').register;
const Eureka = require('eureka-js-client').Eureka;

describe('honeycomb-registry-client', () => {
  let client;

  beforeEach(() => {
    jest.resetAllMocks();
    console.info = jest.fn(); // eslint-disable-line no-console
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

  it('should print a info about successful registration', () => {
    const call = client.on.mock.calls[0];
    expect(call[0]).toBe('started');

    call[1]();
    // eslint-disable-next-line no-console
    expect(console.info).toBeCalledWith('test registered to eureka on "localhost:8761"');
  });

  it('should print a info about successful deregistration', () => {
    const call = client.on.mock.calls[1];
    expect(call[0]).toBe('deregistered');

    call[1]();
    // eslint-disable-next-line no-console
    expect(console.info).toBeCalledWith('test deregistered from eureka');
  });

  it('should be called the start function', () => {
    expect(client.start).toHaveBeenCalled();
  });
});
