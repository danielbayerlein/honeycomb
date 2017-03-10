module.exports = {
  extends: [
    'eslint-config-airbnb-base',
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
  },
};
