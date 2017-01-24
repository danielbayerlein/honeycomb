const register = require('../../lib/index').register;
const pkg = require('../../package.json');

describe('honeycomb-logging-middleware', () => {
  let server;
  let options;
  let next;

  beforeEach(() => {
    options = null;
    next = jest.fn();
    server = {
      register: jest.fn(),
    };
  });

  it('should extend the server with register good', () => {
    register(server, options, next);

    const call = server.register.mock.calls[0][0];

    const registerFn = call.register.register;
    expect(registerFn.attributes.pkg.name).toBe('good');
    expect(typeof registerFn).toBe('function');
    expect(call.options).toEqual({
      ops: false,
      reporters: {
        console: [{
          module: 'good-squeeze',
          name: 'Squeeze',
          args: [{ response: '*' }],
        }, {
          module: 'good-console',
        }, 'stdout'],
      },
    });
  });

  it('should call the next-cb', () => {
    register(server, options, next);
    expect(next).toBeCalled();
  });

  it('should return the package as register.attributes.pkg', () => {
    expect(register.attributes.pkg).toBe(pkg);
  });
});
