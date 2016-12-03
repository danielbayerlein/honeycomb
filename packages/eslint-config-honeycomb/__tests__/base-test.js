const base = require('../base');

describe('honeycomb/base', () => {
  it('extends eslint-config-airbnb-base', () => {
    expect(base.extends[0]).toMatch(/eslint-config-airbnb-base\/index\.js/);
  });

  it('set jest environment', () => {
    expect(base.env).toEqual({ jest: true });
  });

  it('set rules', () => {
    const obj = {
      'comma-dangle': ['error', {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      }],
    };

    expect(base.rules).toEqual(obj);
  });
});
