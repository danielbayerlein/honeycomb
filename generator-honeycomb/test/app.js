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
      '.eslintignore',
      '.eslintrc.yml',
      'public/images/.gitkeep',
      'public/javascripts/.gitkeep',
      'public/stylesheets/.gitkeep',
      '.babelrc',
      '.config/browsersetup.js',
      '.config/chimp.js',
      '.config/log.js',
      '.config/pm2.development.json',
      '.config/pm2.production.json',
      '.config/server.js',
      '.config/webpack.config.js',
      'test/integration/features/steps/index.js',
      'test/integration/features/support/.gitkeep',
      'test/integration/features/index.feature',
      'test/ui/.gitkeep',
      'test/unit/server/controllers/index.test.js',
      'test/.eslintrc.yml',
      'src/shared/.gitkeep',
      'src/server/controllers/health.js',
      'src/server/controllers/index.js',
      'src/server/controllers/status.js',
      'src/server/models/.gitkeep',
      'src/server/routes/health.js',
      'src/server/routes/index.js',
      'src/server/routes/public.js',
      'src/server/routes/status.js',
      'src/server/server.js',
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

    it('creates expected files', () => {
      assert.file([
        'src/client/client.js',
        'src/server/views/index/index.html',
      ]);
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

    describe('.eslintrc.yml', () => {
      it('should have expected content', () => {
        assert.fileContent('.eslintrc.yml', 'airbnb-base');
      });
    });

    describe('.config/server.js', () => {
      it('should have expected content', () => {
        assert.fileContent('.config/server.js', "html: 'handlebars',");
      });
    });

    describe('.config/webpack.config.js', () => {
      it('should have expected content', () => {
        assert.fileContent([
          ['.config/webpack.config.js', "'./src/client/client.js',"],
          ['.config/webpack.config.js', 'test: /\\.js$/,'],
        ]);
      });
    });

    describe('test/unit/server/controllers/index.test.js', () => {
      it('should have expected content', () => {
        assert.fileContent(
          'test/unit/server/controllers/index.test.js',
          "t.is(config.name, 'Handlebars');"
        );
      });
    });

    describe('src/server/controllers/index.js', () => {
      it('should have expected content', () => {
        assert.fileContent(
          'src/server/controllers/index.js',
          "name: 'Handlebars',"
        );
      });
    });
  });

  describe('with react templates', () => {
    before((done) => {
      helpers.run(path.join(__dirname, '../app'))
        .withPrompts({ template: 'react' })
        .on('end', done);
    });

    it('creates expected files', () => {
      assert.file([
        'test/unit/client/components/Example.test.js',
        'src/client/components/Example.jsx',
        'src/client/client.jsx',
        'src/server/views/index/index.jsx',
      ]);
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

    describe('.eslintrc.yml', () => {
      it('should have expected content', () => {
        assert.fileContent('.eslintrc.yml', 'airbnb');
      });
    });

    describe('.babelrc', () => {
      it('should have expected content', () => {
        assert.fileContent('.babelrc', '"react"');
      });
    });

    describe('.config/server.js', () => {
      it('should have expected content', () => {
        assert.fileContent([
          ['.config/server.js', "jsx: 'hapi-react-views',"],
          ['.config/server.js', "js: 'hapi-react-views',"],
        ]);
      });
    });

    describe('.config/webpack.config.js', () => {
      it('should have expected content', () => {
        assert.fileContent([
          ['.config/webpack.config.js', "'./src/client/client.jsx',"],
          ['.config/webpack.config.js', 'test: /\\.(js|jsx)$/,'],
          ['.config/webpack.config.js', "'react-hot-loader/patch',"],
        ]);
      });
    });

    describe('test/.eslintrc.yml', () => {
      it('should have expected content', () => {
        assert.fileContent('test/.eslintrc.yml', 'react/jsx-filename-extension:');
      });
    });

    describe('test/unit/server/controllers/index.test.js', () => {
      it('should have expected content', () => {
        assert.fileContent(
          'test/unit/server/controllers/index.test.js',
          "t.is(config.name, 'React');"
        );
      });
    });

    describe('src/server/controllers/index.js', () => {
      it('should have expected content', () => {
        assert.fileContent(
          'src/server/controllers/index.js',
          "name: 'React',"
        );
      });
    });
  });
});
