const path = require('path');
/* eslint-disable import/no-extraneous-dependencies */
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
/* eslint-enable import/no-extraneous-dependencies */

describe('generator-honeycomb', () => {
  before((done) => {
    helpers.run(path.join(__dirname, '../app'))
      .withPrompts({
        packageAuthor: 'Chuck Norris',
        packageName: 'honeycomb-example',
        packageDescription: 'Example package',
        packageVersion: '1.0.0',
      })
      .on('end', done);
  });

  it('creates expected files', () => {
    assert.file([
      'package.json',
      'Dockerfile',
    ]);
  });

  describe('package.json', () => {
    it('should have expected content', () => {
      assert.fileContent([
        ['package.json', '"author": "Chuck Norris",'],
        ['package.json', '"name": "honeycomb-example",'],
        ['package.json', '"description": "Example package",'],
        ['package.json', '"version": "1.0.0",'],
      ]);
    });
  });

  describe('Dockerfile', () => {
    it('should have expected content', () => {
      assert.fileContent([
        ['Dockerfile', 'RUN mkdir -p /code/honeycomb-example'],
        ['Dockerfile', 'WORKDIR /code/honeycomb-example'],
        ['Dockerfile', 'COPY package.json /code/honeycomb-example/'],
        ['Dockerfile', 'COPY . /code/honeycomb-example'],
      ]);
    });
  });

  describe('with handlebars templates', () => {
    before((done) => {
      helpers.run(path.join(__dirname, '../app'))
        .withPrompts({ template: 'handlebars' })
        .on('end', done);
    });

    describe('package.json', () => {
      it('should have expected content', () => {
        assert.fileContent([
          [
            'package.json',
            '"build": "npm run build:babel && npm run build:views && npm run build:webpack",',
          ],
          ['package.json', '"build:views": "ncp src/server/views dist/server/views",'],
          ['package.json', /"handlebars": ".*",/],
          ['package.json', /"eslint-config-airbnb-base": ".*",/],
          ['package.json', /"ncp": ".*",/],
        ]);
      });
    });
  });

  describe('with react templates', () => {
    before((done) => {
      helpers.run(path.join(__dirname, '../app'))
        .withPrompts({ template: 'react' })
        .on('end', done);
    });

    describe('package.json', () => {
      it('should have expected content', () => {
        assert.fileContent([
          ['package.json', '"build": "npm run build:babel && npm run build:webpack",'],
          ['package.json', /"hapi-react-views": ".*",/],
          ['package.json', /"react": ".*",/],
          ['package.json', /"react-dom": ".*",/],
          ['package.json', /"react-hot-loader": ".*",/],
          ['package.json', /"babel-preset-react": ".*",/],
          ['package.json', /"enzyme": ".*",/],
          ['package.json', /"eslint-config-airbnb": ".*",/],
          ['package.json', /"eslint-plugin-jsx-a11y": ".*",/],
          ['package.json', /"eslint-plugin-react": ".*",/],
          ['package.json', /"react-addons-test-utils": ".*",/],
        ]);
      });
    });
  });
});
