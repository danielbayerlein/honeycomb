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

  it('should have expected "start" export function', () => {
    expect(Object.keys(honeycombServer)).toEqual(['start']);
  });

  describe('start', () => {
    it('should be an instance of function', () => {
      expect(honeycombServer.start).toBeInstanceOf(Function);
    });

    it('should have been called with expected options', () => {
      honeycombServer.start();
      expect(Hapi.Server).toHaveBeenCalledWith({});
    });

    it('should have been called with expected server options', () => {
      const options = { load: { sampleInterval: 1000 } };
      honeycombServer.start({ server: options });
      expect(Hapi.Server).toHaveBeenCalledWith(options);
    });

    it('should have been called server.start()', () => {
      honeycombServer.start();
      expect(server.start).toHaveBeenCalled();
    });

    it('should have been called server.connection()', () => {
      honeycombServer.start();
      expect(server.connection).toHaveBeenCalled();
    });

    it('should have been called server.register()', () => {
      honeycombServer.start({ plugins: [{ module: 'inert' }] });
      expect(server.register).toHaveBeenCalled();
    });

    it('should be return a Promise', () => {
      expect(honeycombServer.start().constructor.name).toBe('Promise');
    });

    it('should be return the server', () => (
      honeycombServer.start()
        .then((serverInstance) => {
          expect(server).toEqual(serverInstance);
        })
    ));

    it('should have been called console.info()', () => (
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
    it('should have been called with expected connections options', () => {
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

    it('should have expected default port', () => {
      honeycombServer.start();
      expect(server.connection.mock.calls[0][0].port).toBe(3000);
    });

    it('should have expected port by process.env.PORT', () => {
      process.env.PORT = 3003;
      honeycombServer.start();
      expect(server.connection.mock.calls[0][0].port).toBe(3003);
    });

    it('should have expected default address', () => {
      honeycombServer.start();
      expect(server.connection.mock.calls[0][0].address).toBe('0.0.0.0');
    });

    it('should have expected address by process.env.HOST_IP', () => {
      process.env.HOST_IP = '127.0.0.1';
      honeycombServer.start();
      expect(server.connection.mock.calls[0][0].address).toBe('127.0.0.1');
    });

    it('should have expected default host', () => {
      honeycombServer.start();
      expect(server.connection.mock.calls[0][0].host).toBe(undefined);
    });

    it('should have expected host by process.env.HOST', () => {
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

    it('should have been called console.error()', () => (
      myServer.then(() => {
        // eslint-disable-next-line no-console
        expect(console.error).toBeCalledWith(
          'There was an error starting the server'
        );
      })
    ));

    it('should have been called server.stop()', () => (
      myServer.then(() => expect(server.stop).toHaveBeenCalled())
    ));
  });
});
