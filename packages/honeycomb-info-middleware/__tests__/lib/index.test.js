const register = require('../../lib/index').register;
const pkg = require('../../package.json');

describe('honeycomb-info-middleware', () => {
  let server;
  let options;
  let next;

  const ENV = 'test';
  const UPTIME = 12345;
  const MEMORY_USAGE = { rss: 4935680 };
  const CPU_USAGE = { system: 6986 };
  const VERSION = '7.2.1';

  beforeEach(() => {
    options = {
      pkg,
      process: {
        env: { NODE_ENV: ENV },
        uptime: () => UPTIME,
        memoryUsage: () => MEMORY_USAGE,
        cpuUsage: () => CPU_USAGE,
        version: VERSION,
      },
    };
    next = jest.fn();
    server = {
      route: jest.fn(),
    };
  });

  it('should extend the server with an info-route', () => {
    register(server, options, next);

    const call = server.route.mock.calls[0][0];

    expect(call.method).toBe('GET');
    expect(call.path).toBe('/info');
    expect(typeof call.handler).toBe('function');
  });

  it('the info-route should return the info-object', () => {
    register(server, options, next);

    const call = server.route.mock.calls[0][0];
    const reply = jest.fn();

    call.handler({}, reply);

    const replied = reply.mock.calls[0][0];

    expect(replied.name).toBe(pkg.name);
    expect(replied.version).toBe(pkg.version);
    expect(replied.description).toBe(pkg.description);
    expect(replied.author).toBe(pkg.author);
    expect(replied.contributors).toBe(pkg.contributors);
    expect(replied.env).toBe(ENV);
    expect(replied.uptime).toBe(UPTIME);
    expect(replied.memory).toBe(MEMORY_USAGE);
    expect(replied.cpu).toBe(CPU_USAGE);
    expect(replied.node).toBe(VERSION);
  });

  it('should call the next-cb', () => {
    register(server, options, next);
    expect(next).toBeCalled();
  });

  it('should return the package as register.attributes.pkg', () => {
    expect(register.attributes.pkg).toBe(pkg);
  });
});
