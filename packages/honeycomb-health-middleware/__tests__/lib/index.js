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

  it('should extend the server with a health-route', () => {
    register(server, options, next);

    const call = server.route.mock.calls[0][0];

    expect(call.method).toBe('GET');
    expect(call.path).toBe('/health');
    expect(typeof call.handler).toBe('function');
  });

  it('the health-route should return on object with status: up', () => {
    register(server, options, next);

    const call = server.route.mock.calls[0][0];
    const reply = jest.fn();

    call.handler({}, reply);

    const replied = reply.mock.calls[0][0];

    expect(replied.status).toBe('UP');
  });

  it('should call the next-cb', () => {
    register(server, options, next);
    expect(next).toBeCalled();
  });

  it('should return the package as register.attributes.pkg', () => {
    expect(register.attributes.pkg).toBe(pkg);
  });
});
