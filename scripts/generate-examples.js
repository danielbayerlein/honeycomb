const execSync = require('child_process').execSync;
const fs = require('fs');
const path = require('path');
const rimraf = require('rimraf').sync;

const packagesDirectory = path.join(__dirname, '..', 'packages');
const honeycombGenerator = path.join(packagesDirectory, 'generator-honeycomb');

['handlebars', 'react'].forEach(variation => {
  const exampleDirectory = path.join(packagesDirectory, `example-${variation}`);

  rimraf(exampleDirectory);
  fs.mkdirSync(exampleDirectory);
  process.chdir(exampleDirectory);

  const args = [
    '--author Honeycomb',
    `--name example-${variation}`,
    `--description "Honeycomb example with ${variation}"`,
    `--template "${variation}"`,
    '--skip-install',
  ].join(' ');
  execSync(`yo ${honeycombGenerator} ${args}`, { stdio: 'ignore' });
});
