const base = require('../base');

describe('honeycomb/base', () => {
  it('should extends eslint-config-airbnb-base', () => {
    expect(base.extends[0]).toMatch(/eslint-config-airbnb-base\/index\.js/);
  });

  it('should have expected jest environment', () => {
    expect(base.env).toEqual({
      jest: true,
      browser: true,
    });
  });

  it('should have expected rules', () => {
    const rules = {
      'comma-dangle': ['error', {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      }],
    };

    expect(base.rules).toEqual(rules);
  });
});
