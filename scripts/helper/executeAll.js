const spawn = require('child_process').spawn;
const path = require('path');

let error = false;

const NPM_WARNINGS = [
  'npm',
  'deprecated',
  'WARN',
  'No description',
  'No repository'
];

/**
 * Check if the error-message is a npm-warning
 * to prevent build-break
 *
 * @param  {string}   msg  error-message
 * @return {boolean}       is npm warning
 */
function isNPMWarning(msg) {
  return NPM_WARNINGS.filter(el => msg.indexOf(el) !== -1).length > 0;
}

/**
 * Creates a promise-wrapper around the child_process.spawn-API
 * calls the command with args for the project-name
 *
 * @param  {string}  command shell command (example: npm)
 * @param  {array}   args    arguments for the command (example: test)
 * @param  {string}  project project-name (folder)
 * @return {promise}         resolvable promise
 */
function spawnPromise(command, args, project) {
  const commandForProject = `${command} ${args} for ${project}`;

  console.log(`start ${commandForProject}`);
  process.chdir(path.join(__dirname, '..', '..', project));

  // creates a promise wrapper around the stream
  return new Promise((resolve) => {
    let localError = false;
    const proc = spawn(command, args);

    proc.stdout.on('data', (data) => {
      console.log(data.toString());
    });

    proc.stderr.on('data', (data) => {
      const dataString = data.toString();

      // Filter empty stderr or npm WARN messages
      if (dataString.trim().length && !isNPMWarning(dataString)) {
        localError = true;
      }

      console.error(dataString);
    });

    proc.on('close', () => {
      if (localError) {
        console.log(`finished ${commandForProject} with errors`);
        error = true;
      } else {
        console.log(`finished ${commandForProject} successfully`);
      }

      resolve();
    });
  });
}

/**
 * Generator to iterate over the projects
 *
 * @param  {array}      projects array with all projects
 * @return {generator}           generator with all projects
 */
function* genProjects(projects) {
    yield* projects;
}

/**
 * Executes the given command for all projects
 * calls process.exit(1) if an error occurs
 *
 * @param  {string} command  shell-command (example: npm)
 * @param  {string} args     arguments for the command (example: test)
 * @param  {array}  projects project-names
 * @return {void}
 */
function executeAll(command, args, projects) {
  const it = genProjects(projects);
  let currentProject;

  (function iterate() {
    currentProject = it.next();

    if (currentProject.done) {
      if (error) {
        console.error(`${command} ${args} failed`);
        process.exit(1);
      } else {
        console.log(`${command} ${args} successful`);
      }
    } else {
      spawnPromise(command, args, currentProject.value).then(() => iterate());
    }
  })();
}

module.exports = executeAll;
