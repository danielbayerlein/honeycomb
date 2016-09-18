const yeoman = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

const TEMPLATE_ENGINE_REACT = 'react';
const TEMPLATE_ENGINE_HANDLEBARS = 'handlebars';

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
      required: true,
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
    this.includeReact = this.options.template === TEMPLATE_ENGINE_REACT;
    this.includeHandlebars = this.options.template === TEMPLATE_ENGINE_HANDLEBARS;
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
          value: TEMPLATE_ENGINE_REACT,
        },
        {
          name: 'Handlebars',
          value: TEMPLATE_ENGINE_HANDLEBARS,
        },
      ],
      when: () => {
        const templateEngines = [TEMPLATE_ENGINE_REACT, TEMPLATE_ENGINE_HANDLEBARS];
        return templateEngines.indexOf(this.templateEngine) === -1;
      },
    }];

    return this.prompt(prompts).then((props) => {
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
        this.includeReact = props.templateEngine === TEMPLATE_ENGINE_REACT;
        this.includeHandlebars = props.templateEngine === TEMPLATE_ENGINE_HANDLEBARS;
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
        { includeReact: this.includeReact }
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
      this.copy('.config/chimp.js');
      this.copy('.config/log.js');

      this.template(
        '.config/_pm2.json',
        '.config/pm2.development.json',
        {
          name: this.packageName,
          env: 'development',
        }
      );

      this.template(
        '.config/_pm2.json',
        '.config/pm2.production.json',
        {
          name: this.packageName,
          env: 'production',
        }
      );

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
      this.directory('test/unit/server/controllers');

      if (this.includeReact) {
        this.directory('test/unit/client');
      }
    },

    srcDir: function srcDir() {
      this.directory('src/shared');
      this.directory('src/server/controllers');
      this.directory('src/server/models');
      this.directory('src/server/routes');
      this.copy('src/server/server.js');

      if (this.includeReact) {
        this.copy('src/client/components/Example.jsx');
        this.copy('src/server/views/index/index.jsx');
        this.copy('src/client/client.jsx');
      }

      if (this.includeHandlebars) {
        this.copy('src/client/client.js');
        this.copy('src/server/views/index/index.html');
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
