jest.mock('hapi');
const Hapi = require('hapi');
const HoneycombServer = require('../../lib/');

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
    expect(Object.keys(HoneycombServer)).toEqual(['start']);
  });

  describe('start', () => {
    it('should be an instance of function', () => {
      expect(HoneycombServer.start).toBeInstanceOf(Function);
    });

    it('should have been called with expected options', () => {
      HoneycombServer.start();
      expect(Hapi.Server).toHaveBeenCalledWith({});
    });

    it('should have been called with expected server options', () => {
      const options = { load: { sampleInterval: 1000 } };
      HoneycombServer.start({ server: options });
      expect(Hapi.Server).toHaveBeenCalledWith(options);
    });

    it('should have been called server.start()', () => {
      HoneycombServer.start();
      expect(server.start).toHaveBeenCalled();
    });

    it('should have been called server.connection()', () => {
      HoneycombServer.start();
      expect(server.connection).toHaveBeenCalled();
    });

    it('should have been called server.register()', () => {
      HoneycombServer.start({ plugins: [{ module: 'inert' }] });
      expect(server.register).toHaveBeenCalled();
    });

    it('should be return a Promise', () => {
      expect(HoneycombServer.start().constructor.name).toBe('Promise');
    });

    // eslint-disable-next-line arrow-body-style
    it('should be return the server', () => {
      return HoneycombServer.start()
        .then((serverInstance) => {
          expect(server).toEqual(serverInstance);
        });
    });

    // eslint-disable-next-line arrow-body-style
    it('should have been called console.info()', () => {
      return HoneycombServer.start()
        .then(() => {
          // eslint-disable-next-line no-console
          expect(console.info).toBeCalledWith(
            'Server running at:', 'http://honeycomb.example.com:3000'
          );
        });
    });
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
  });

  describe('error', () => {
    let myServer;

    beforeEach(() => {
      server.start = jest.fn(() => new Promise((resolve, reject) => { reject(); }));
      Hapi.Server.mockImplementation(() => server);

      myServer = HoneycombServer.start({
        server: {
          cache: {
            engine: {
              start: callback => (callback(new Error('oops'))),
            },
          },
        },
      });
    });

    // eslint-disable-next-line arrow-body-style
    it('should have been called console.error()', () => {
      return myServer.then(() => {
        // eslint-disable-next-line no-console
        expect(console.error).toBeCalledWith('There was an error starting the server');
      });
    });

    // eslint-disable-next-line arrow-body-style
    it('should have been called server.stop()', () => {
      return myServer.then(() => {
        expect(server.stop).toHaveBeenCalled();
      });
    });
  });
});
