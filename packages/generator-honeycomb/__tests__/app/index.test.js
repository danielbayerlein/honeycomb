const path = require('path');
/* eslint-disable import/no-extraneous-dependencies */
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
/* eslint-enable import/no-extraneous-dependencies */

describe('generator-honeycomb', () => {
  const appPath = path.join(__dirname, '..', '..', 'app');
  const author = 'Chuck Norris';
  const name = 'honeycomb-example';
  const description = 'Example package';
  const version = '1.2.3';
  const port = 3001;

  const options = {
    author,
    name,
    description,
    version,
    port,
  };

  const prompts = {
    packageAuthor: author,
    packageName: name,
    packageDescription: description,
    packageVersion: version,
    applicationPort: port,
  };

  ['prompts', 'options'].forEach((type) => {
    describe(`with ${type}`, () => {
      beforeAll((done) => {
        if (type === 'prompts') {
          helpers
            .run(appPath)
            .withPrompts(prompts)
            .on('end', done);
        } else if (type === 'options') {
          helpers
            .run(appPath)
            .withOptions(options)
            .on('end', done);
        }
      });

      test('creates expected files', () => {
        assert.file([
          '.babelrc',
          '.config/codecept.json',
          '.config/server.js',
          '.config/webpack.config.js',
          '.dockerignore',
          '.eslintignore',
          '.eslintrc.yml',
          '.stylelintrc.yml',
          'Dockerfile',
          'package.json',
          'public/images/.gitkeep',
          'public/javascripts/.gitkeep',
          'public/stylesheets/.gitkeep',
          'src/client/client.js',
          'src/client/client.css',
          'src/shared/.gitkeep',
          'src/server/controllers/index.js',
          'src/server/models/.gitkeep',
          'src/server/routes/index.js',
          'src/server/routes/public.js',
          'src/server/server.js',
          'test/.eslintrc.yml',
          'test/acceptance/index.test.js',
          'test/bench/cases.js',
          'test/bench/server/controllers/index.js',
          'test/ui/.gitkeep',
          'test/unit/server/controllers/index.test.js',
        ]);
      });

      describe('package.json', () => {
        test('has expected content', () => {
          assert.fileContent([
            ['package.json', '"author": "Chuck Norris",'],
            ['package.json', '"name": "honeycomb-example",'],
            ['package.json', '"description": "Example package",'],
            ['package.json', '"version": "1.2.3",'],
          ]);
        });
      });

      describe('Dockerfile', () => {
        test('has expected content', () => {
          assert.fileContent([
            ['Dockerfile', 'RUN mkdir -p /code/honeycomb-example'],
            ['Dockerfile', 'WORKDIR /code/honeycomb-example'],
            ['Dockerfile', 'COPY package.json /code/honeycomb-example/'],
            ['Dockerfile', 'COPY . /code/honeycomb-example'],
            ['Dockerfile', 'EXPOSE 3001'],
          ]);
        });
      });

      describe('.config/codecept.json', () => {
        test('has expected content', () => {
          assert.fileContent('.config/codecept.json', '"url": "http://localhost:3001"');
          assert.fileContent('.config/codecept.json', '"name": "honeycomb-example test suite"');
        });
      });

      describe('.config/server.js', () => {
        test('has expected content', () => {
          assert.fileContent('.config/server.js', 'port: parseInt(process.env.PORT, 10) || 3001,');
        });
      });

      describe('and handlebars templates', () => {
        beforeAll((done) => {
          if (type === 'prompts') {
            prompts.templateEngine = 'handlebars';
            helpers.run(appPath).withPrompts(prompts).on('end', done);
          } else if (type === 'options') {
            options.template = 'handlebars';
            helpers.run(appPath).withOptions(options).on('end', done);
          }
        });

        it('creates expected files', () => {
          assert.file('src/server/views/index/index.html');
        });

        describe('package.json', () => {
          test('has expected content', () => {
            assert.fileContent([
              ['package.json', '"build": "npm run build:babel && npm run build:views && npm run build:webpack",'],
              ['package.json', '"build:views": "ncp src/server/views dist/server/views",'],
              ['package.json', '"start:development": "cross-env NODE_ENV=development nodemon src/server/server.js --exec babel-node --watch src/server --ext js,html",'],
              ['package.json', /"handlebars": ".*",/],
              ['package.json', /"ncp": ".*",/],
            ]);
          });
        });

        describe('.eslintrc.yml', () => {
          test('has expected content', () => {
            assert.fileContent('.eslintrc.yml', 'honeycomb/base');
          });
        });

        describe('.config/server.js', () => {
          test('has expected content', () => {
            assert.fileContent('.config/server.js', "html: 'handlebars',");
          });
        });

        describe('src/client/client.js', () => {
          test('has expected content', () => {
            assert.fileContent('src/client/client.js', "console.log('DOM has been loaded');");
          });
        });
      });

      describe('and preact templates', () => {
        beforeAll((done) => {
          if (type === 'prompts') {
            prompts.templateEngine = 'preact';
            helpers
              .run(appPath)
              .withPrompts(prompts)
              .on('end', done);
          } else if (type === 'options') {
            options.template = 'preact';
            helpers
              .run(appPath)
              .withOptions(options)
              .on('end', done);
          }
        });

        test('creates expected files', () => {
          assert.file([
            'src/client/components/Example.js',
            'src/server/views/index/index.js',
            'test/unit/client/components/Example.test.js',
            'test/unit/client/components/__snapshots__/Example.test.js.snap',
          ]);
        });

        describe('package.json', () => {
          test('has expected content', () => {
            assert.fileContent([
              ['package.json', '"build": "npm run build:babel && npm run build:webpack",'],
              ['package.json', '"start:development": "cross-env NODE_ENV=development nodemon src/server/server.js --exec babel-node --watch src/server --ext js",'],
              ['package.json', /"hapi-preact-views": ".*",/],
              ['package.json', /"preact": ".*",/],
              ['package.json', /"babel-plugin-transform-react-jsx": ".*",/],
              ['package.json', /"eslint-plugin-jsx-a11y": ".*",/],
              ['package.json', /"eslint-plugin-react": ".*",/],
              ['package.json', /"preact-render-to-string": ".*",/],
            ]);
          });
        });

        describe('.eslintrc.yml', () => {
          test('has expected content', () => {
            assert.fileContent('.eslintrc.yml', 'honeycomb/preact');
          });
        });

        describe('.babelrc', () => {
          test('has expected content', () => {
            assert.fileContent('.babelrc', '[ "transform-react-jsx", { "pragma": "h" } ]');
          });
        });

        describe('.config/server.js', () => {
          test('has expected content', () => {
            assert.fileContent('.config/server.js', "js: 'hapi-preact-views'");
          });
        });

        describe('.config/webpack.config.js', () => {
          test('has expected content', () => {
            assert.fileContent('.config/webpack.config.js', 'externals');
          });
        });

        describe('src/client/client.js', () => {
          test('has expected content', () => {
            assert.fileContent('src/client/client.js', "import { h, render } from 'preact';");
          });
        });
      });
    });
  });
});
