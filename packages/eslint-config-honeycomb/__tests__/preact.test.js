const preact = require('../preact');

describe('honeycomb/preact', () => {
  it('should extends eslint-config-airbnb', () => {
    expect(preact.extends[0]).toMatch(/eslint-config-airbnb\/index\.js/);
  });

  it('should have expected jest environment', () => {
    expect(preact.env).toEqual({ jest: true });
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
      'react/jsx-filename-extension': ['error', {
        extensions: ['.js'],
      }],
    };

    expect(preact.rules).toEqual(rules);
  });
});
