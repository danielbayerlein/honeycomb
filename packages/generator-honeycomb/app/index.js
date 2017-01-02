/* eslint no-underscore-dangle: ["error", { "allowAfterThis": true }] */

const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

const DEFAULT_PORT = 3000;
const DEFAULT_VERSION = '1.0.0';
const TEMPLATE_ENGINE_REACT = 'react';
const TEMPLATE_ENGINE_HANDLEBARS = 'handlebars';

const globOptions = { dot: true };

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

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
      optional: true,
      defaults: DEFAULT_VERSION,
    });

    this.option('port', {
      desc: 'Port of the service',
      type: Number,
      optional: true,
      defaults: DEFAULT_PORT,
    });

    this.option('template', {
      desc: 'Template system of the service (react|handlebars)',
      type: String,
      required: true,
    });

    this.packageAuthor = this.options.author;
    this.packageName = this.options.name;
    this.packageDescription = this.options.description;
    this.templateEngine = this.options.template;

    if (this.templateEngine) {
      this.includeReact = this.templateEngine === TEMPLATE_ENGINE_REACT;
      this.includeHandlebars = this.templateEngine === TEMPLATE_ENGINE_HANDLEBARS;
    }

    // Set defaults if options are used
    if (this.packageAuthor || this.packageName || this.packageDescription || this.templateEngine) {
      this.packageVersion = this.options.version;
      this.applicationPort = this.options.port;
    }
  }

  prompting() {
    this.log(yosay(`Welcome to the ${chalk.yellow('honeycomb')} generator!`));

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
      default: DEFAULT_VERSION,
      when: () => this.packageVersion === undefined,
    }, {
      type: 'input',
      name: 'applicationPort',
      message: 'Your service port',
      default: DEFAULT_PORT,
      when: () => this.applicationPort === undefined,
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

      if (props.applicationPort) {
        this.applicationPort = props.applicationPort;
      }

      if (props.templateEngine) {
        this.includeReact = props.templateEngine === TEMPLATE_ENGINE_REACT;
        this.includeHandlebars = props.templateEngine === TEMPLATE_ENGINE_HANDLEBARS;
      }
    });
  }

  writing() {
    this._packageJSON();
    this._docker();
    this._eslint();
    this._stylelint();
    this._public();
    this._babel();
    this._config();
    this._test();
    this._src();
  }

  install() {
    this.npmInstall();
  }

  end() {
    this.log(yosay('Bye bye'));
  }

  // Private methods

  _packageJSON() {
    this.fs.copyTpl(
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
  }

  _docker() {
    this.fs.copy(
      this.templatePath('.dockerignore'),
      this.destinationPath('.dockerignore')
    );

    this.fs.copyTpl(
      this.templatePath('_Dockerfile'),
      this.destinationPath('Dockerfile'),
      {
        dir: this.packageName,
        port: this.applicationPort,
      }
    );
  }

  _eslint() {
    this.fs.copy(
      this.templatePath('.eslintignore'),
      this.destinationPath('.eslintignore')
    );

    this.fs.copyTpl(
      this.templatePath('_.eslintrc.yml'),
      this.destinationPath('.eslintrc.yml'),
      { includeReact: this.includeReact }
    );
  }

  _stylelint() {
    this.fs.copyTpl(
      this.templatePath('_.stylelintrc.yml'),
      this.destinationPath('.stylelintrc.yml'),
      { includeReact: this.includeReact }
    );
  }

  _public() {
    this.fs.copy(
      this.templatePath('public/**'),
      this.destinationPath('public'),
      { globOptions }
    );
  }

  _babel() {
    this.fs.copyTpl(
      this.templatePath('_.babelrc'),
      this.destinationPath('.babelrc'),
      { includeReact: this.includeReact }
    );
  }

  _config() {
    this.fs.copyTpl(
      this.templatePath('.config/_codecept.json'),
      this.destinationPath('.config/codecept.json'),
      {
        name: this.packageName,
        port: this.applicationPort,
      }
    );

    this.fs.copyTpl(
      this.templatePath('.config/_server.js'),
      this.destinationPath('.config/server.js'),
      {
        includeReact: this.includeReact,
        includeHandlebars: this.includeHandlebars,
        port: this.applicationPort,
      }
    );

    this.fs.copyTpl(
      this.templatePath('.config/_webpack.config.js'),
      this.destinationPath('.config/webpack.config.js'),
      {
        includeReact: this.includeReact,
        includeHandlebars: this.includeHandlebars,
      }
    );
  }

  _test() {
    this.fs.copy(
      this.templatePath('test/.eslintrc.yml'),
      this.destinationPath('test/.eslintrc.yml')
    );

    this.fs.copy(
      this.templatePath('test/acceptance/**'),
      this.destinationPath('test/acceptance'),
      { globOptions }
    );

    this.fs.copy(
      this.templatePath('test/bench/**'),
      this.destinationPath('test/bench'),
      { globOptions }
    );

    this.fs.copy(
      this.templatePath('test/ui/**'),
      this.destinationPath('test/ui'),
      { globOptions }
    );

    this.fs.copy(
      this.templatePath('test/unit/server/controllers/**'),
      this.destinationPath('test/unit/server/controllers'),
      { globOptions }
    );

    if (this.includeReact) {
      this.fs.copy(
        this.templatePath('test/unit/client/**'),
        this.destinationPath('test/unit/client'),
        { globOptions }
      );
    }
  }

  _src() {
    this.fs.copy(
      this.templatePath('src/shared/**'),
      this.destinationPath('src/shared'),
      { globOptions }
    );

    this.fs.copy(
      this.templatePath('src/server/controllers/**'),
      this.destinationPath('src/server/controllers'),
      { globOptions }
    );

    this.fs.copy(
      this.templatePath('src/server/models/**'),
      this.destinationPath('src/server/models'),
      { globOptions }
    );

    this.fs.copy(
      this.templatePath('src/server/routes/**'),
      this.destinationPath('src/server/routes'),
      { globOptions }
    );

    this.fs.copy(
      this.templatePath('src/server/server.js'),
      this.destinationPath('src/server/server.js')
    );

    this.fs.copyTpl(
      this.templatePath('src/client/_.client.js'),
      this.destinationPath('src/client/client.js'),
      {
        includeReact: this.includeReact,
        includeHandlebars: this.includeHandlebars,
      }
    );

    if (this.includeReact) {
      this.fs.copy(
        this.templatePath('src/client/components/Example.js'),
        this.destinationPath('src/client/components/Example.js')
      );

      this.fs.copy(
        this.templatePath('src/server/views/index/index.js'),
        this.destinationPath('src/server/views/index/index.js')
      );

      this.fs.copy(
        this.templatePath('src/server/views/layouts/default.js'),
        this.destinationPath('src/server/views/layouts/default.js')
      );
    }

    if (this.includeHandlebars) {
      this.fs.copy(
        this.templatePath('src/client/client.css'),
        this.destinationPath('src/client/client.css')
      );

      this.fs.copy(
        this.templatePath('src/server/views/index/index.html'),
        this.destinationPath('src/server/views/index/index.html')
      );
    }
  }
};
