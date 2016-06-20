module.exports = {
  path: 'test/integration/features',
  webdriverio: {
    // FIXME: Use current port
    baseUrl: 'http://localhost:3000',
    waitforTimeout: 10000,
    waitforInterval: 1000,
  },
};
