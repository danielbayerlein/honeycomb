const yeoman = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = yeoman.Base.extend({
  constructor: function constructor(...args) {
    yeoman.Base.apply(this, args);

    this.option('author', {
      desc: 'Author of the service',
      type: String,
      required: true,
    });

    this.option('name', {
      desc: 'Name of the service',
      type: String,
      required: false,
      // defaults: this.appname,
    });

    this.option('description', {
      desc: 'Description of the service',
      type: String,
      required: true,
    });

    this.option('version', {
      desc: 'Version of the service',
      type: String,
      required: false,
      defaults: '1.0.0',
    });

    this.option('template', {
      desc: 'Template system of the service (react|handlebars)',
      type: String,
      required: true,
    });

    this.packageAuthor = this.options.author;
    this.packageName = this.options.name;
    this.packageDescription = this.options.description;
    this.packageVersion = this.options.version;
    this.templateEngine = this.options.template;
    this.includeReact = this.options.template === 'react';
    this.includeHandlebars = this.options.template === 'handlebars';
    this.eslintConfiguration = this.options.template === 'react' ? 'airbnb' : '"airbnb-base"';
  },

  prompting: function prompting() {
    this.log(yosay(
      `Welcome to the ${chalk.yellow('honeycomb')} generator!`
    ));

    const prompts = [{
      type: 'input',
      name: 'packageAuthor',
      message: 'Your name',
      store: true,
      when: () => this.packageAuthor === undefined,
    }, {
      type: 'input',
      name: 'packageName',
      message: 'Your service name',
      // default: this.appname,
      when: () => this.packageName === undefined,
    }, {
      type: 'input',
      name: 'packageDescription',
      message: 'Your service description',
      when: () => this.packageDescription === undefined,
    }, {
      type: 'input',
      name: 'packageVersion',
      message: 'Your service version',
      default: '1.0.0',
      when: () => this.packageVersion === undefined,
    }, {
      type: 'list',
      name: 'templateEngine',
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
      when: () => this.templateEngine === undefined,
    }];

    return this.prompt(prompts).then(props => {
      if (props.packageAuthor) {
        this.packageAuthor = props.packageAuthor;
      }

      if (props.packageName) {
        this.packageName = props.packageName;
      }

      if (props.packageDescription) {
        this.packageDescription = props.packageDescription;
      }

      if (props.packageVersion) {
        this.packageVersion = props.packageVersion;
      }

      if (props.templateEngine) {
        this.includeReact = props.templateEngine === 'react';
        this.includeHandlebars = props.templateEngine === 'handlebars';
        this.eslintConfiguration = props.templateEngine === 'react' ? 'airbnb' : '"airbnb-base"';
      }
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
    this.npmInstall();
  },

  end: function end() {
    this.log(yosay(
      'Bye bye'
    ));
  },
});
