const executeAll = require('./helper/executeAll');
const packages = require('./helper/packages');

executeAll('npm test', packages);
