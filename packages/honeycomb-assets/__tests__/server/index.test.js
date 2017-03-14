jest.mock('honeycomb-server');

const path = require('path');
const pkg = require('../../package.json');

describe('honeycomb-assets', () => {
  let server;
  let honeycombServer;

  function setup(success = true) {
    // eslint-disable-next-line global-require
    honeycombServer = require('honeycomb-server');

    server = { route: jest.fn() };

    console.error = jest.fn(); // eslint-disable-line no-console

    honeycombServer.start = jest.fn(() => (
      new Promise((resolve, reject) => (
        success ? resolve(server) : reject('Failed to start server')
      ))
    ));

    require('../../src/server/index'); // eslint-disable-line global-require
  }

  afterEach(() => {
    jest.resetModules();
    jest.resetAllMocks();
  });

  test('calls "honeycombServer.start()" with options', () => {
    setup();

    expect(honeycombServer.start).toBeCalledWith({
      plugins: [
        { module: 'inert' },
        { module: 'honeycomb-logging-middleware' },
        { module: 'honeycomb-health-middleware' },
        { module: 'honeycomb-status-middleware' },
        {
          module: 'honeycomb-info-middleware',
          options: { pkg, process },
        },
      ],
    });
  });

  test('creates an static assets endpoint', () => {
    setup();

    return honeycombServer.start()
      .then((serverInstance) => {
        expect(serverInstance.route).toBeCalledWith({
          method: 'GET',
          path: '/{param*}',
          handler: {
            directory: {
              path: path.resolve('src', 'client'),
            },
          },
        });
      });
  });

  test('logs the error message', () => {
    setup(false);

    return honeycombServer.start()
      .catch((error) => {
        expect(error).toBe('Failed to start server');
      });
  });
});
