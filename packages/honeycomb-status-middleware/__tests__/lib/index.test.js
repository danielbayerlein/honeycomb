jest.mock('hapijs-status-monitor');

const hapijsStatusMonitorPlugin = require('hapijs-status-monitor');
const register = require('../../lib/index').register;
const pkg = require('../../package.json');

describe('honeycomb-status-middleware', () => {
  let server;
  let options;
  let next;
  let title = 'Status';
  const path = '/admin/status';

  beforeEach(() => {
    options = {};
    next = jest.fn();
    server = {
      register: jest.fn(),
    };
  });

  it('should have been called server.register with expected options', () => {
    register(server, options, next);
    expect(server.register).toHaveBeenCalledWith({
      options: { path, title },
      register: hapijsStatusMonitorPlugin,
    });
  });

  it('should have been called server.register with custom title', () => {
    title = 'My Status Monitor';
    register(server, { title }, next);
    expect(server.register).toHaveBeenCalledWith({
      options: { path, title },
      register: hapijsStatusMonitorPlugin,
    });
  });

  it('should have been called next()', () => {
    register(server, options, next);
    expect(next).toBeCalled();
  });

  it('should return the package as register.attributes.pkg', () => {
    expect(register.attributes.pkg).toBe(pkg);
  });
});
