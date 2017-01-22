jest.mock('hapi');

const Hapi = require('hapi');
const path = require('path');

describe('server', () => {
  let server;

  beforeEach(() => {
    server = {
      connection: jest.fn(),
      register: jest.fn(),
      start: jest.fn(),
      route: jest.fn(),
      info: { uri: 'localhost:12345' },
    };

    Hapi.Server.mockImplementation(() => server);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  // TODO Unit-Test for Honeycomb-Server initialisation

  it('should have a endpoint for the assets', () => {
    require('../../src/server/index'); // eslint-disable-line global-require

    // server.register - callback
    server.register.mock.calls[0][1]();

    // test route-config for assets
    const routeConfig = server.route.mock.calls[0][0];

    expect(routeConfig.method).toBe('GET');
    expect(routeConfig.path).toBe('/{param*}');
    expect(routeConfig.handler.directory.path).toBe(path.join(__dirname, '..', '..', 'src', 'client'));
  });
});
