const yeoman = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = yeoman.Base.extend({
  prompting: function prompting() {
    this.log(yosay(
      `Welcome to the ${chalk.yellow('honeycomb')} generator!`
    ));

    const prompts = [{
      type: 'input',
      name: 'packageAuthor',
      message: 'Your name',
    }, {
      type: 'input',
      name: 'packageName',
      message: 'Your service name',
      default: this.appname,
    }, {
      type: 'input',
      name: 'packageDescription',
      message: 'Your service description',
    }, {
      type: 'input',
      name: 'packageVersion',
      message: 'Your service version',
      default: '1.0.0',
    }, {
      type: 'list',
      name: 'template',
      message: 'Which template system do you want?',
      choices: [
        {
          name: 'React',
          value: 'react',
        },
        {
          name: 'Handlebars',
          value: 'handlebars',
        },
      ],
    }];

    return this.prompt(prompts).then(props => {
      this.packageAuthor = props.packageAuthor;
      this.packageName = props.packageName;
      this.packageDescription = props.packageDescription;
      this.packageVersion = props.packageVersion;
      this.includeReact = props.template === 'react';
      this.includeHandlebars = props.template === 'handlebars';
      this.eslintConfiguration = props.template === 'react' ? 'airbnb' : '"airbnb-base"';
    });
  },

  writing: {
    packageJSON: function packageJSON() {
      this.template(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'),
        {
          packageAuthor: this.packageAuthor,
          packageName: this.packageName,
          packageDescription: this.packageDescription,
          packageVersion: this.packageVersion,
          includeReact: this.includeReact,
          includeHandlebars: this.includeHandlebars,
        }
      );
    },

    docker: function docker() {
      this.template(
        this.templatePath('_Dockerfile'),
        this.destinationPath('Dockerfile'),
        { dir: this.packageName }
      );
    },

    eslint: function eslint() {
      this.copy(
        this.templatePath('.eslintignore'),
        this.destinationPath('.eslintignore')
      );

      this.template(
        this.templatePath('_.eslintrc.yml'),
        this.destinationPath('.eslintrc.yml'),
        { configuration: this.eslintConfiguration }
      );
    },

    publicDir: function publicDir() {
      this.directory(
        this.templatePath('public'),
        this.destinationPath('public')
      );
    },

    babel: function babel() {
      this.template(
        this.templatePath('_.babelrc'),
        this.destinationPath('.babelrc'),
        { includeReact: this.includeReact }
      );
    },

    configDir: function configDir() {
      this.copy(
        this.templatePath('.config/browsersetup.js'),
        this.destinationPath('.config/browsersetup.js')
      );

      this.copy(
        this.templatePath('.config/chimp.js'),
        this.destinationPath('.config/chimp.js')
      );

      this.copy(
        this.templatePath('.config/log.js'),
        this.destinationPath('.config/log.js')
      );

      this.copy(
        this.templatePath('.config/pm2.development.json'),
        this.destinationPath('.config/pm2.development.json')
      );

      this.copy(
        this.templatePath('.config/pm2.production.json'),
        this.destinationPath('.config/pm2.production.json')
      );

      this.template(
        this.templatePath('.config/_server.js'),
        this.destinationPath('.config/server.js'),
        {
          includeReact: this.includeReact,
          includeHandlebars: this.includeHandlebars,
        }
      );

      this.template(
        this.templatePath('.config/_webpack.config.js'),
        this.destinationPath('.config/webpack.config.js'),
        {
          includeReact: this.includeReact,
          includeHandlebars: this.includeHandlebars,
        }
      );
    },

    testDir: function testDir() {
      this.template(
        this.templatePath('test/_.eslintrc.yml'),
        this.destinationPath('test/.eslintrc.yml'),
        { includeReact: this.includeReact }
      );

      this.directory(
        this.templatePath('test/integration'),
        this.destinationPath('test/integration')
      );

      this.directory(
        this.templatePath('test/ui'),
        this.destinationPath('test/ui')
      );

      if (this.includeReact) {
        this.directory(
          this.templatePath('test/unit/client'),
          this.destinationPath('test/unit/client')
        );
      }

      this.template(
        this.templatePath('test/unit/server/controllers/_index.test.js'),
        this.destinationPath('test/unit/server/controllers/index.test.js'),
        {
          includeReact: this.includeReact,
          includeHandlebars: this.includeHandlebars,
        }
      );
    },

    srcDir: function srcDir() {
      this.directory(
        this.templatePath('src/shared'),
        this.destinationPath('src/shared')
      );

      if (this.includeReact) {
        this.copy(
          this.templatePath('src/client/components/Example.jsx'),
          this.destinationPath('src/client/components/Example.jsx')
        );

        this.copy(
          this.templatePath('src/client/client.jsx'),
          this.destinationPath('src/client/client.jsx')
        );
      }

      if (this.includeHandlebars) {
        this.copy(
          this.templatePath('src/client/client.js'),
          this.destinationPath('src/client/client.js')
        );
      }

      this.template(
        this.templatePath('src/server/controllers/_index.js'),
        this.destinationPath('src/server/controllers/index.js'),
        {
          includeReact: this.includeReact,
          includeHandlebars: this.includeHandlebars,
        }
      );

      this.copy(
        this.templatePath('src/server/controllers/health.js'),
        this.destinationPath('src/server/controllers/health.js')
      );

      this.copy(
        this.templatePath('src/server/controllers/status.js'),
        this.destinationPath('src/server/controllers/status.js')
      );

      this.directory(
        this.templatePath('src/server/models'),
        this.destinationPath('src/server/models')
      );

      this.directory(
        this.templatePath('src/server/models'),
        this.destinationPath('src/server/models')
      );

      this.directory(
        this.templatePath('src/server/routes'),
        this.destinationPath('src/server/routes')
      );

      this.copy(
        this.templatePath('src/server/server.js'),
        this.destinationPath('src/server/server.js')
      );

      if (this.includeHandlebars) {
        this.copy(
          this.templatePath('src/server/views/index/index.html'),
          this.destinationPath('src/server/views/index/index.html')
        );
      }

      if (this.includeReact) {
        this.copy(
          this.templatePath('src/server/views/index/index.jsx'),
          this.destinationPath('src/server/views/index/index.jsx')
        );
      }
    },
  },

  install: function install() {
    // this.npmInstall();
  },

  end: function end() {
    this.log(yosay(
      'Bye bye'
    ));
  },
});
