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
