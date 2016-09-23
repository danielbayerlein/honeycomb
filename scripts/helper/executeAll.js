const proc = require('child_process');
const path = require('path');

let errors = false;

/**
 * Execute the given command for the given project
 * relative from the root-folder.
 * if an error occurs it set true to the global error-variable
 *
 * @param  {string} command shell-command
 * @param  {string} project project-name
 * @return {void}
 */
function executeCommand(command, project) {
  console.log(`start ${command} for ${project}`);
  process.chdir(path.join(__dirname, '..', '..', project));

  try {
    const result = proc.execSync(`${command}`);
    console.log(result.toString());
  } catch (error) {
    console.error(`${command} for ${project} failed`);
    errors = true;
  }

  console.log(`finished ${command} for ${project}`);
}

/**
 * Executes the given command for all projects
 * calls process.exit(1) if an error occurs
 *
 * @param  {string} command  shell-command
 * @param  {array}  projects project-names
 * @return {void}
 */
function executeAll(command, projects) {
  projects.forEach(project => executeCommand(command, project));

  if (errors) {
    console.error(`${command} failed`);
    process.exit(1);
  } else {
    console.log(`${command} successful`);
  }
}

module.exports = executeAll;
