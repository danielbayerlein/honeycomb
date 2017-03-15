jest.mock('honeycomb-server');

const path = require('path');
const honeycombServer = require('honeycomb-server');

describe('honeycomb-layout', () => {
  beforeEach(() => {
    honeycombServer.start = jest.fn();
    require('../../src/index'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  test('calls "honeycombServer.start()" with options', () => {
    expect(honeycombServer.start).toBeCalledWith({
      plugins: [
        {
          module: 'honeycomb-logging-middleware',
        },
        {
          module: 'hapi-tailor-middleware',
          options: {
            templatesPath: path.resolve('templates'),
          },
        },
      ],
    });
  });
});
