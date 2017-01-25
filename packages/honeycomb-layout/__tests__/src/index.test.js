jest.mock('path');
jest.mock('honeycomb-server');

const path = require('path');
const honeycombServer = require('honeycomb-server');

describe('honeycomb-layout', () => {
  beforeEach(() => {
    honeycombServer.start = jest.fn();
    path.join.mockImplementation((...args) => {
      args.shift();
      return args.join('/');
    });
    require('../../src/index'); // eslint-disable-line global-require
  });

  afterEach(() => {
    jest.resetAllMocks();
  });


  it('should called "honeycombServer.start()" with options', () => {
    expect(honeycombServer.start).toBeCalledWith({
      plugins: [
        {
          module: 'honeycomb-logging-middleware',
        },
        {
          module: 'hapi-tailor-middleware',
          options: {
            templatesPath: '../templates',
          },
        },
      ],
    });
  });
});
