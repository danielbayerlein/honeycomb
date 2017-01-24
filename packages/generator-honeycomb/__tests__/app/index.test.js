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

      it('creates expected files', () => {
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
          'src/shared/.gitkeep',
          'src/server/controllers/index.js',
          'src/server/models/.gitkeep',
          'src/server/routes/index.js',
          'src/server/routes/public.js',
          'src/server/server.js',
          'test/.eslintrc.yml',
          'test/acceptance/index_test.js',
          'test/bench/cases.js',
          'test/bench/server/controllers/index.js',
          'test/ui/.gitkeep',
          'test/unit/server/controllers/index-test.js',
        ]);
      });

      describe('package.json', () => {
        it('should have expected content', () => {
          assert.fileContent([
            ['package.json', '"author": "Chuck Norris",'],
            ['package.json', '"name": "honeycomb-example",'],
            ['package.json', '"description": "Example package",'],
            ['package.json', '"version": "1.2.3",'],
          ]);
        });
      });

      describe('.stylelintrc.yml', () => {
        it('should have expected content', () => {
          assert.fileContent('.stylelintrc.yml', '"stylelint-config-standard"');
        });
      });

      describe('Dockerfile', () => {
        it('should have expected content', () => {
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
        it('should have expected content', () => {
          assert.fileContent('.config/codecept.json', '"url": "http://localhost:3001"');
          assert.fileContent('.config/codecept.json', '"name": "honeycomb-example test suite"');
        });
      });

      describe('.config/server.js', () => {
        it('should have expected content', () => {
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
          assert.file('src/client/client.css');
        });

        describe('package.json', () => {
          it('should have expected content', () => {
            assert.fileContent([
              ['package.json', '"build": "npm run build:babel && npm run build:views && npm run build:webpack",'],
              ['package.json', '"build:views": "ncp src/server/views dist/server/views",'],
              ['package.json', '"lint:styles": "stylelint src/client/**/*.css"'],
              ['package.json', '"clean": "rimraf pids logs coverage dist output public/**/*.bundle.*"'],
              ['package.json', '"start:development": "cross-env NODE_ENV=development nodemon src/server/server.js --exec babel-node --watch src/server --ext js,html",'],
              ['package.json', /"handlebars": ".*",/],
              ['package.json', /"ncp": ".*",/],
              ['package.json', /"css-loader": ".*",/],
              ['package.json', /"style-loader": ".*",/],
              ['package.json', /"postcss-loader": ".*",/],
              ['package.json', /"autoprefixer": ".*",/],
              ['package.json', /"stylelint-webpack-plugin": ".*",/],
              ['package.json', /"extract-text-webpack-plugin": ".*",/],
            ]);
          });
        });

        describe('.eslintrc.yml', () => {
          it('should have expected content', () => {
            assert.fileContent('.eslintrc.yml', 'honeycomb/base');
          });
        });

        describe('.config/server.js', () => {
          it('should have expected content', () => {
            assert.fileContent('.config/server.js', "html: 'handlebars',");
          });
        });

        describe('.config/webpack.config.js', () => {
          it('should have expected content', () => {
            assert.fileContent('.config/webpack.config.js', "const ExtractTextPlugin = require('extract-text-webpack-plugin');");
            assert.fileContent('.config/webpack.config.js', "const StyleLintPlugin = require('stylelint-webpack-plugin');");
            assert.fileContent('.config/webpack.config.js', 'postcss: [autoprefixer()],');
            // eslint-disable-next-line no-template-curly-in-string
            assert.fileContent('.config/webpack.config.js', 'new ExtractTextPlugin(`stylesheets/${serviceName}.bundle.css`),');
            assert.fileContent('.config/webpack.config.js', 'new StyleLintPlugin({');
            assert.fileContent('.config/webpack.config.js', "configFile: path.join(__dirname, '..', '.stylelintrc.yml'),");
            assert.fileContent('.config/webpack.config.js', "files: ['src/**/*.css'],");
          });
        });

        describe('src/client/client.js', () => {
          it('should have expected content', () => {
            assert.fileContent('src/client/client.js', "console.log('DOM has been loaded');");
            assert.fileContent('src/client/client.js', "import './client.css';");
          });
        });
      });

      describe('and react templates', () => {
        beforeAll((done) => {
          if (type === 'prompts') {
            prompts.templateEngine = 'react';
            helpers
              .run(appPath)
              .withPrompts(prompts)
              .on('end', done);
          } else if (type === 'options') {
            options.template = 'react';
            helpers
              .run(appPath)
              .withOptions(options)
              .on('end', done);
          }
        });

        it('creates expected files', () => {
          assert.file([
            'src/client/components/Example.js',
            'src/server/views/index/index.js',
            'src/server/views/layouts/default.js',
            'test/unit/client/components/Example-test.js',
            'test/unit/client/components/__snapshots__/Example-test.js.snap',
          ]);
        });

        describe('package.json', () => {
          it('should have expected content', () => {
            assert.fileContent([
              ['package.json', '"build": "npm run build:babel && npm run build:webpack",'],
              ['package.json', '"clean": "rimraf pids logs coverage dist output public/javascripts/*.bundle.js"'],
              ['package.json', '"lint:styles": "stylelint src/server/views/**/*.js src/client/components/**/*.js",'],
              ['package.json', '"start:development": "cross-env NODE_ENV=development nodemon src/server/server.js --exec babel-node --watch src/server --ext js",'],
              ['package.json', /"hapi-react-views": ".*",/],
              ['package.json', /"react": ".*",/],
              ['package.json', /"react-dom": ".*",/],
              ['package.json', /"react-hot-loader": ".*",/],
              ['package.json', /"babel-preset-react": ".*",/],
              ['package.json', /"eslint-plugin-jsx-a11y": ".*",/],
              ['package.json', /"eslint-plugin-react": ".*",/],
              ['package.json', /"react-test-renderer": ".*",/],
              ['package.json', /"styled-components": ".*",/],
              ['package.json', /"stylelint-processor-styled-components": ".*"/],
            ]);
          });
        });

        describe('.eslintrc.yml', () => {
          it('should have expected content', () => {
            assert.fileContent('.eslintrc.yml', 'honeycomb/react');
          });
        });

        describe('.stylelintrc.yml', () => {
          it('should have expected content', () => {
            assert.fileContent('.stylelintrc.yml', 'processors');
            assert.fileContent('.stylelintrc.yml', '- stylelint-processor-styled-components');
          });
        });

        describe('.babelrc', () => {
          it('should have expected content', () => {
            assert.fileContent('.babelrc', '"react"');
            assert.fileContent('.babelrc', '"react-hot-loader/babel"');
          });
        });

        describe('.config/server.js', () => {
          it('should have expected content', () => {
            assert.fileContent('.config/server.js', "js: 'hapi-react-views'");
          });
        });

        describe('.config/webpack.config.js', () => {
          it('should have expected content', () => {
            assert.fileContent('.config/webpack.config.js', "'react-hot-loader/patch',");
            assert.fileContent('.config/webpack.config.js', "'styled-components$': 'styled-components/lib/index.js',");
            assert.fileContent('.config/webpack.config.js', 'externals');
          });
        });

        describe('src/client/client.js', () => {
          it('should have expected content', () => {
            assert.fileContent('src/client/client.js', "import React from 'react';");
          });
        });
      });
    });
  });
});
