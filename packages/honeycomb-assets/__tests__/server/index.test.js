jest.mock('honeycomb-server');

const path = require('path');
const honeycombServer = require('honeycomb-server');
const pkg = require('../../package.json');

describe('server', () => {
  const server = { route: jest.fn() };

  honeycombServer.start = jest.fn();
  honeycombServer.start.mockImplementation(() => new Promise(resolve => resolve(server)));

  // eslint-disable-next-line global-require
  require('../../src/server/index');

  it('should call honeycomb.start with all required plugins', () => {
    expect(honeycombServer.start).toBeCalledWith({
      plugins: [
        { module: 'inert' },
        { module: 'honeycomb-logging-middleware' },
        { module: 'honeycomb-health-middleware' },
        {
          module: 'honeycomb-info-middleware',
          options: { pkg, process },
        },
        {
          module: 'hapijs-status-monitor',
          options: { title: 'Status' },
        },
      ],
    });
  });

  it('should create an endpoint for the assets', () => (
    // testing an "async operation" needs a little timeout to get server.route called
    new Promise((resolve) => {
      setTimeout(() => {
        expect(server.route).toBeCalledWith({
          method: 'GET',
          path: '/{param*}',
          handler: {
            directory: {
              path: path.resolve(__dirname, '..', '..', 'src', 'client'),
            },
          },
        });

        resolve();
      }, 10);
    })
  ));
});
