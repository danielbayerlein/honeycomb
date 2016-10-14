const executeAll = require('./helper/executeAll');
const projects = require('./helper/projects');

executeAll('npm', ['test'], projects);
