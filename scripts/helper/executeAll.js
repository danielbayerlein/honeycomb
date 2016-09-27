const spawn = require('child_process').spawn;
const path = require('path');

let error = false;

/**
 * check if the error-message is as npm-warning
 * to prevent build-break
 *
 * @param  {string}   msg  error-message
 * @return {boolean}       is npm warning
 */
function isNPMWarning(msg) {
  return msg.indexOf('npm') !== -1
    || msg.indexOf('WARN') !== -1
    || msg.indexOf('no description') !== -1
    || msg.indexOf('no repository') !== -1;
}

/**
 * creates a promise-wrapper arount the child_process.spawn-API
 * calls the command with args for the project-name
 *
 * @param  {string}  command shell command (example: npm)
 * @param  {array}   args    arguments for the command (example: test)
 * @param  {string}  project project-name (folder)
 * @return {promise}         resolvable promise
 */
function spawnPromise(command, args, project) {
  console.log(`start ${command} ${args} for ${project}`);
  process.chdir(path.join(__dirname, '..', '..', project));

  // creates a promise wrapper around the stream
  return new Promise((resolve) => {
    const proc = spawn(command, args);

    proc.stdout.on('data', (data) => {
      console.log(data.toString());
    });

    proc.stderr.on('data', (data) => {
      const dataString = data.toString();

      // Filter empty stderr or npm WARN messages
      if (dataString.trim().length && !isNPMWarning(dataString)) {
        error = true;
      }

      console.error(dataString);
    });

    proc.on('close', () => {
      console.log(`finished ${command} ${args} for ${project}`);
      resolve();
    });
  });
}

/**
 * Generator to iteratate over the the projects
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
 * @param  {string} command  shell-command
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
