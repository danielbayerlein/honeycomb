const caniuseYarn = require('@danielbayerlein/caniuse-yarn');
const executeAll = require('./helper/executeAll');
const projects = require('./helper/projects');

executeAll(caniuseYarn() ? 'yarn' : 'npm', ['install'], projects);
