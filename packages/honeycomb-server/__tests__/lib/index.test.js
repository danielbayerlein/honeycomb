jest.mock('hapi');
const Hapi = require('hapi');
const honeycombServer = require('../../lib/');

describe('honeycomb-server', () => {
  let server;

  beforeEach(() => {
    server = {
      connection: jest.fn(),
      register: jest.fn(),
      start: jest.fn(() => new Promise((resolve) => { resolve(); })),
      stop: jest.fn(),
      info: {
        uri: 'http://honeycomb.example.com:3000',
      },
    };

    Hapi.Server.mockImplementation(() => server);

    console.info = jest.fn(); // eslint-disable-line no-console
    console.error = jest.fn(); // eslint-disable-line no-console
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('has expected "start" export function', () => {
    expect(Object.keys(honeycombServer)).toEqual(['start']);
  });

  describe('start', () => {
    test('is an instance of function', () => {
      expect(honeycombServer.start).toBeInstanceOf(Function);
    });

    test('has been called with expected options', () => {
      honeycombServer.start();
      expect(Hapi.Server).toHaveBeenCalledWith({});
    });

    test('has been called with expected server options', () => {
      const options = { load: { sampleInterval: 1000 } };
      honeycombServer.start({ server: options });
      expect(Hapi.Server).toHaveBeenCalledWith(options);
    });

    test('has been called server.start()', () => {
      honeycombServer.start();
      expect(server.start).toHaveBeenCalled();
    });

    test('has been called server.connection()', () => {
      honeycombServer.start();
      expect(server.connection).toHaveBeenCalled();
    });

    test('has been called server.register()', () => {
      honeycombServer.start({ plugins: [{ module: 'inert' }] });
      expect(server.register).toHaveBeenCalled();
    });

    test('returns a Promise', () => {
      expect(honeycombServer.start().constructor.name).toBe('Promise');
    });

    test('returns the server', () => (
      honeycombServer.start()
        .then((serverInstance) => {
          expect(server).toEqual(serverInstance);
        })
    ));

    test('has been called console.info()', () => (
      honeycombServer.start()
        .then(() => {
          // eslint-disable-next-line no-console
          expect(console.info).toBeCalledWith(
            'Server running at:', 'http://honeycomb.example.com:3000'
          );
        })
    ));
  });

  describe('connection', () => {
    test('has been called with expected connections options', () => {
      const options = {
        connections: [{
          host: 'honeycomb.example.com',
          address: '127.0.0.1',
          port: 3003,
        }],
      };

      honeycombServer.start(options);

      expect(server.connection.mock.calls[0][0].port).toBe(options.connections[0].port);
      expect(server.connection.mock.calls[0][0].address).toBe(options.connections[0].address);
      expect(server.connection.mock.calls[0][0].host).toBe(options.connections[0].host);
    });

    test('has expected default port', () => {
      honeycombServer.start();
      expect(server.connection.mock.calls[0][0].port).toBe(3000);
    });

    test('has expected port by process.env.PORT', () => {
      process.env.PORT = 3003;
      honeycombServer.start();
      expect(server.connection.mock.calls[0][0].port).toBe(3003);
    });

    test('has expected default address', () => {
      honeycombServer.start();
      expect(server.connection.mock.calls[0][0].address).toBe('0.0.0.0');
    });

    test('has expected address by process.env.HOST_IP', () => {
      process.env.HOST_IP = '127.0.0.1';
      honeycombServer.start();
      expect(server.connection.mock.calls[0][0].address).toBe('127.0.0.1');
    });

    test('has expected default host', () => {
      honeycombServer.start();
      expect(server.connection.mock.calls[0][0].host).toBe(undefined);
    });

    test('has expected host by process.env.HOST', () => {
      process.env.HOST = 'honeycomb.example.com';
      honeycombServer.start();
      expect(server.connection.mock.calls[0][0].host).toBe('honeycomb.example.com');
    });
  });

  describe('error', () => {
    let myServer;

    beforeEach(() => {
      server.start = jest.fn(() => new Promise((resolve, reject) => { reject(); }));
      Hapi.Server.mockImplementation(() => server);

      myServer = honeycombServer.start({
        server: {
          cache: {
            engine: {
              start: callback => (callback(new Error('oops'))),
            },
          },
        },
      });
    });

    test('has been called console.error()', () => (
      myServer.then(() => {
        // eslint-disable-next-line no-console
        expect(console.error).toBeCalledWith(
          'There was an error starting the server'
        );
      })
    ));

    test('has been called server.stop()', () => (
      myServer.then(() => expect(server.stop).toHaveBeenCalled())
    ));
  });
});
