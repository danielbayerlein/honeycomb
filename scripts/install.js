const caniuseYarn = require('@danielbayerlein/caniuse-yarn');
const executeAll = require('./helper/executeAll');
const projects = require('./helper/projects');

if (caniuseYarn()) {
  executeAll('yarn', ['install'], projects);
} else {
  executeAll('npm', ['install'], projects);
}

