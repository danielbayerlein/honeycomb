jest.mock('hapi');
const Hapi = require('hapi');
const HoneycombServer = require('../../lib/');

describe('honeycomb-server', () => {
  let server;

  beforeEach(() => {
    jest.resetAllMocks();

    server = {
      connection: jest.fn(),
      register: jest.fn(),
      start: jest.fn(),
    };

    Hapi.Server.mockImplementation(() => server);

    // console.info = jest.fn(); // eslint-disable-line no-console
  });

  it('should have expected export functions', () => {
    expect(Object.keys(HoneycombServer)).toEqual(['start']);
  });

  it('should be an instance of function', () => {
    expect(HoneycombServer.start).toBeInstanceOf(Function);
  });

  it('should called with expected server default options', () => {
    HoneycombServer.start();

    expect(Hapi.Server).toHaveBeenCalledWith({});
  });

  it('should called with expected server options', () => {
    const options = { load: { sampleInterval: 1000 } };

    HoneycombServer.start({ server: options });

    expect(Hapi.Server).toHaveBeenCalledWith(options);
  });

  it('should called with expected connections options', () => {
    const options = { connections: [{ host: 'honeycomb.example.com', address: '127.0.0.1', port: 3003 }] };

    HoneycombServer.start(options);

    expect(server.connection.mock.calls[0][0].port).toBe(options.connections[0].port);
    expect(server.connection.mock.calls[0][0].address).toBe(options.connections[0].address);
    expect(server.connection.mock.calls[0][0].host).toBe(options.connections[0].host);
  });

  it('should have expected default port', () => {
    HoneycombServer.start();
    expect(server.connection.mock.calls[0][0].port).toBe(3000);
  });

  it('should have expected port by process.env.PORT', () => {
    process.env.PORT = 3003;
    HoneycombServer.start();
    expect(server.connection.mock.calls[0][0].port).toBe(3003);
  });

  it('should have expected default address', () => {
    HoneycombServer.start();
    expect(server.connection.mock.calls[0][0].address).toBe('0.0.0.0');
  });

  it('should have expected address by process.env.HOST_IP', () => {
    process.env.HOST_IP = '127.0.0.1';
    HoneycombServer.start();
    expect(server.connection.mock.calls[0][0].address).toBe('127.0.0.1');
  });

  it('should have expected default host', () => {
    HoneycombServer.start();
    expect(server.connection.mock.calls[0][0].host).toBe(undefined);
  });

  it('should have expected host by process.env.HOST', () => {
    process.env.HOST = 'honeycomb.example.com';
    HoneycombServer.start();
    expect(server.connection.mock.calls[0][0].host).toBe('honeycomb.example.com');
  });

  it('should called server.start()', () => {
    HoneycombServer.start();
    expect(server.start).toBeCalled();
  });

  it('should called server.connection()', () => {
    HoneycombServer.start();

    expect(server.connection).toBeCalled();
  });

  // it('should called server.register()', () => {
  //   const options = { plugins: [{ module: 'honeycomb-logging-middleware' }] };
  //
  //   HoneycombServer.start(options);
  //
  //   expect(server.register).toBeCalled();
  // });
});
