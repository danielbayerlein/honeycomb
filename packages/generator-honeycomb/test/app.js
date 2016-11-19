const path = require('path');
/* eslint-disable import/no-extraneous-dependencies */
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
/* eslint-enable import/no-extraneous-dependencies */

describe('generator-honeycomb', () => {
  const appPath = path.join(__dirname, '../app');
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
      before((done) => {
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
          '.config/chimp.js',
          '.config/log.js',
          '.config/pm2.development.json',
          '.config/pm2.production.json',
          '.config/server.js',
          '.config/webpack.config.js',
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
          'src/server/controllers/health.js',
          'src/server/controllers/index.js',
          'src/server/controllers/info.js',
          'src/server/models/.gitkeep',
          'src/server/routes/health.js',
          'src/server/routes/index.js',
          'src/server/routes/info.js',
          'src/server/routes/public.js',
          'src/server/server.js',
          'test/.eslintrc.yml',
          'test/bench/cases.js',
          'test/bench/server/controllers/info.js',
          'test/integration/features/steps/index.js',
          'test/integration/features/support/.gitkeep',
          'test/integration/features/index.feature',
          'test/ui/.gitkeep',
          'test/unit/server/controllers/index.test.js',
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

      describe('.config/chimp.js', () => {
        it('should have expected content', () => {
          assert.fileContent('.config/chimp.js', "baseUrl: 'http://localhost:3001',");
        });
      });

      describe('.config/server.js', () => {
        it('should have expected content', () => {
          assert.fileContent('.config/server.js', 'port: process.env.PORT || 3001,');
        });
      });

      describe('.config/pm2.development.json', () => {
        it('should have expected content', () => {
          assert.fileContent([
            ['.config/pm2.development.json', '"name": "honeycomb-example"'],
            ['.config/pm2.development.json', '"script": "src/server/server.js"'],
            ['.config/pm2.development.json', '"watch": ["src/server"]'],
            ['.config/pm2.development.json', '"exec_interpreter": "babel-node"'],
            ['.config/pm2.development.json', '"NODE_ENV": "development"'],
            ['.config/pm2.development.json', '"error_file": "logs/honeycomb-example.error.log"'],
            ['.config/pm2.development.json', '"out_file": "logs/honeycomb-example.out.log"'],
            ['.config/pm2.development.json', '"pid_file": "pids/honeycomb-example.pid"'],
          ]);
        });
      });

      describe('.config/pm2.production.json', () => {
        it('should have expected content', () => {
          assert.fileContent([
            ['.config/pm2.production.json', '"name": "honeycomb-example"'],
            ['.config/pm2.production.json', '"script": "dist/server/server.js"'],
            ['.config/pm2.production.json', '"instances": 2'],
            ['.config/pm2.production.json', '"exec_mode": "cluster"'],
            ['.config/pm2.production.json', '"NODE_ENV": "production"'],
            ['.config/pm2.production.json', '"error_file": "logs/honeycomb-example.error.log"'],
            ['.config/pm2.production.json', '"out_file": "logs/honeycomb-example.out.log"'],
            ['.config/pm2.production.json', '"pid_file": "pids/honeycomb-example.pid"'],
          ]);
        });
      });

      describe('and handlebars templates', () => {
        before((done) => {
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
              [
                'package.json',
                '"build": "npm run build:babel && npm run build:views && npm run build:webpack",',
              ],
              ['package.json', '"build:views": "ncp src/server/views dist/server/views",'],
              ['package.json', '"lint:styles": "stylelint src/client/**/*.css"'],
              ['package.json', '"clean": "rimraf pids logs coverage .nyc_output dist public/**/*.bundle.(j|cs)s"'],
              ['package.json', /"handlebars": ".*",/],
              ['package.json', /"eslint-config-airbnb-base": ".*",/],
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
            assert.fileContent('.eslintrc.yml', '"airbnb-base"');
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
            assert.fileContent('.config/webpack.config.js', "new ExtractTextPlugin('stylesheets/app.bundle.css'),");
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
        before((done) => {
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
            'test/unit/client/components/Example.test.js',
            'test/unit/client/components/__snapshots__/Example.test.js.snap',
          ]);
        });

        describe('package.json', () => {
          it('should have expected content', () => {
            assert.fileContent([
              ['package.json', '"build": "npm run build:babel && npm run build:webpack",'],
              ['package.json', '"clean": "rimraf pids logs coverage .nyc_output dist public/javascripts/*.bundle.js"'],
              ['package.json', '"lint:styles": "stylelint src/server/views/**/*.js src/client/components/**/*.js",'],
              ['package.json', /"hapi-react-views": ".*",/],
              ['package.json', /"react": ".*",/],
              ['package.json', /"react-dom": ".*",/],
              ['package.json', /"react-hot-loader": ".*",/],
              ['package.json', /"babel-preset-react": ".*",/],
              ['package.json', /"eslint-config-airbnb": ".*",/],
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
            assert.fileContent('.eslintrc.yml', 'airbnb');
            assert.fileContent('.eslintrc.yml', 'react/jsx-filename-extension');
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
