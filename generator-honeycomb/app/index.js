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
        '_package.json',
        'package.json',
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
        '_Dockerfile',
        'Dockerfile',
        { dir: this.packageName }
      );
    },

    eslint: function eslint() {
      this.copy('.eslintignore');

      this.template(
        '_.eslintrc.yml',
        '.eslintrc.yml',
        { configuration: this.eslintConfiguration }
      );
    },

    publicDir: function publicDir() {
      this.directory('public');
    },

    babel: function babel() {
      this.template(
        '_.babelrc',
        '.babelrc',
        { includeReact: this.includeReact }
      );
    },

    configDir: function configDir() {
      this.copy('.config/browsersetup.js');
      this.copy('.config/chimp.js');
      this.copy('.config/log.js');
      this.copy('.config/pm2.development.json');
      this.copy('.config/pm2.production.json');

      this.template(
        '.config/_server.js',
        '.config/server.js',
        {
          includeReact: this.includeReact,
          includeHandlebars: this.includeHandlebars,
        }
      );

      this.template(
        '.config/_webpack.config.js',
        '.config/webpack.config.js',
        {
          includeReact: this.includeReact,
          includeHandlebars: this.includeHandlebars,
        }
      );
    },

    testDir: function testDir() {
      this.template(
        'test/_.eslintrc.yml',
        'test/.eslintrc.yml',
        { includeReact: this.includeReact }
      );

      this.directory('test/integration');
      this.directory('test/ui');

      if (this.includeReact) {
        this.directory('test/unit/client');
      }

      this.template(
        'test/unit/server/controllers/_index.test.js',
        'test/unit/server/controllers/index.test.js',
        {
          includeReact: this.includeReact,
          includeHandlebars: this.includeHandlebars,
        }
      );
    },

    srcDir: function srcDir() {
      this.directory('src/shared');

      if (this.includeReact) {
        this.copy('src/client/components/Example.jsx');
        this.copy('src/client/client.jsx');
      }

      if (this.includeHandlebars) {
        this.copy('src/client/client.js');
      }

      this.template(
        'src/server/controllers/_index.js',
        'src/server/controllers/index.js',
        {
          includeReact: this.includeReact,
          includeHandlebars: this.includeHandlebars,
        }
      );

      this.copy('src/server/controllers/health.js');
      this.copy('src/server/controllers/status.js');
      this.directory('src/server/models');
      this.directory('src/server/models');
      this.directory('src/server/routes');
      this.copy('src/server/server.js');

      if (this.includeHandlebars) {
        this.copy('src/server/views/index/index.html');
      }

      if (this.includeReact) {
        this.copy('src/server/views/index/index.jsx');
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
