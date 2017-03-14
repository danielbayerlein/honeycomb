const register = require('../../lib/index').register;
const pkg = require('../../package.json');

describe('honeycomb-health-middleware', () => {
  let server;
  let options;
  let next;

  beforeEach(() => {
    options = null;
    next = jest.fn();
    server = {
      route: jest.fn(),
    };
  });

  test('extends the server with a health-route', () => {
    register(server, options, next);

    const call = server.route.mock.calls[0][0];

    expect(call.method).toBe('GET');
    expect(call.path).toBe('/admin/health');
    expect(typeof call.handler).toBe('function');
  });

  test('returns an object with status: up for the health route', () => {
    register(server, options, next);

    const call = server.route.mock.calls[0][0];
    const reply = jest.fn();

    call.handler({}, reply);

    const replied = reply.mock.calls[0][0];

    expect(replied.status).toBe('UP');
  });

  test('calls the next-cb', () => {
    register(server, options, next);
    expect(next).toBeCalled();
  });

  test('returns the package as register.attributes.pkg', () => {
    expect(register.attributes.pkg).toBe(pkg);
  });
});
