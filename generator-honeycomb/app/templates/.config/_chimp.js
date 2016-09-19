module.exports = {
  browser: 'phantomjs',
  path: 'test/integration/features',
  webdriverio: {
    baseUrl: 'http://localhost:<%= port %>',
    waitforTimeout: 10000,
    waitforInterval: 1000,
  },
};
