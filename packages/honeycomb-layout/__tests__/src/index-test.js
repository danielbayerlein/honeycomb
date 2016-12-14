/* eslint-disable global-require */
jest.mock('hapi');
jest.mock('hoek');

describe('layoutService', () => {
  let server;
  let Hapi;
  let path;
  let tailor;
  let Hoek;

  function setup(port = '') {
    jest.resetModules();
    jest.resetAllMocks();

    Hapi = require('hapi');
    path = require('path');
    tailor = require('hapi-tailor-middleware');
    Hoek = require('hoek');

    server = {
      connection: jest.fn(),
      register: jest.fn(),
      start: jest.fn(),
      info: { uri: 'localhost:12345' },
    };

    Hapi.Server.mockImplementation(() => server);
    Hoek.assert.mockImplementation(() => true);
    console.info = jest.fn(); // eslint-disable-line no-console

    process.env.PORT = port;
    require('../../src/index');
  }

  beforeEach(() => setup());

  it('should use the default-port for connection', () => {
    expect(server.connection.mock.calls[0][0].port).toBe(3000);
  });

  it('sould bind the connection on process.env.PORT or use the default PORT', () => {
    setup(9999);
    expect(server.connection.mock.calls[0][0].port).toBe('9999');
  });

  it('should register the hapi-tailor-middleware', () => {
    const call = server.register.mock.calls[0][0];

    expect(call[0].register).toBe(tailor);
    expect(call[0].options.templatesPath).toBe(path.join(__dirname, '..', '..', 'templates'));
  });

  it('should check for registration-error', () => {
    const call = server.register.mock.calls[0][1];

    call(false);
    expect(Hoek.assert).toBeCalledWith(true, false);
  });

  it('should start the server, checks for binding error and print that the server has started', () => {
    const registrationCall = server.register.mock.calls[0][1];

    registrationCall(false);
    expect(server.start).toBeCalled();

    const serverCall = server.start.mock.calls[0][0];
    serverCall(false);

    expect(Hoek.assert).toBeCalledWith(true, false);
    // eslint-disable-next-line no-console
    expect(console.info).toBeCalledWith('Server running at:', 'localhost:12345');
  });
});
