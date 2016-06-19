const webpackEnv = { env: { test: true } };
const webpackConfig = require('./webpack.config')(webpackEnv);
const filesGlob = '../test/unit/**/*.spec.js';
const coverageDir = '../coverage/';

process.env.BABEL_ENV = 'test';

module.exports = config => {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['mocha'],

    // list of files / patterns to load in the browser
    files: [filesGlob],

    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      [filesGlob]: ['webpack'],
    },

    // webpack
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
    },

    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],

    // configuration for karma-coverage
    coverageReporter: {
      reporters: [
        { type: 'lcov', dir: coverageDir, subdir: '.' },
        { type: 'json', dir: coverageDir, subdir: '.' },
        { type: 'text-summary' },
      ],
    },

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR
    // || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,

    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true,

    // Concurrency level
    // how many browser should be started simultaneous
    concurrency: Infinity,

    // dont fail when not tests are specified
    failOnEmptyTestSuite: false,
  });
};
