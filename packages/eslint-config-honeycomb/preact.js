module.exports = {
  extends: [
    'eslint-config-airbnb',
  ].map(require.resolve),
  env: {
    jest: true,
    browser: true,
  },
  rules: {
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
  },
};
