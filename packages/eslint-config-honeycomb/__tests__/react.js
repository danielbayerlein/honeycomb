const react = require('../react');

describe('honeycomb/react', () => {
  it('should extends eslint-config-airbnb', () => {
    expect(react.extends[0]).toMatch(/eslint-config-airbnb\/index\.js/);
  });

  it('should have expected jest environment', () => {
    expect(react.env).toEqual({ jest: true });
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

    expect(react.rules).toEqual(rules);
  });
});
