const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');
const rimraf = require('rimraf').sync;

const variations = ['handlebars', 'react'];

console.log('setup for all honeycomb-combinations');

console.log('link actual version of generator-honeycomb');
childProcess.execSync('npm link generator-honeycomb');

variations.forEach(variation => {
  console.log(`create ${variation}-microservice with yo`);
  const folder = path.join(__dirname, '..', `test-${variation}`);

  rimraf(folder);
  fs.mkdirSync(folder);

  process.chdir(folder);
  childProcess.execSync(`node ../node_modules/yo/lib/cli.js honeycomb --author test --name test-${variation} --description "testsetup for ${variation}" --template "${variation}" --skip-install`);

  childProcess.execSync('npm link ../honeycomb-registry-client');
  childProcess.execSync('npm install');

  console.log(`created ${variation}-microservice successfully`);
});

console.log('created successfully all microservice-variants');
