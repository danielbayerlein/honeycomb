const fs = require('fs');
const path = require('path');
const childProcess = require('child_process');

const variations = ['handlebars', 'react'];

console.log('setup for all honeycomb-combinations');

console.log('install yeoman');
childProcess.execSync('npm install yo');

console.log('link actual version of generator-honeycomb');
childProcess.execSync('npm link generator-honeycomb');

variations.forEach(variation => {
  console.log(`create ${variation}-microservice with yo`);
  const folder = path.join(__dirname, '..', `test-${variation}`);

  try {
    fs.mkdirSync(folder);
  } catch (error) {
    fs.rmdirSync(folder);
    fs.mkdirSync(folder);
  }

  process.chdir(folder);
  childProcess.execSync('npm link ../honeycomb-registry-client');
  childProcess.execSync(`node ../node_modules/yo/lib/cli.js honeycomb --author test --name test-${variation} --description "testsetup for ${variation}" --template "${variation}"`);

  console.log(`created ${variation}-microservice successfully`);
});

console.log('created successfully all microservice-variants');
