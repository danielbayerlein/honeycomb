const preact = require('../preact');

describe('honeycomb/preact', () => {
  test('extends eslint-config-airbnb', () => {
    expect(preact.extends[0]).toMatch(/eslint-config-airbnb\/index\.js/);
  });

  test('has expected jest environment', () => {
    expect(preact.env).toEqual({
      jest: true,
      browser: true,
    });
  });

  test('has expected rules', () => {
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
      'react/prop-types': 'off',
    };

    expect(preact.rules).toEqual(rules);
  });
});
