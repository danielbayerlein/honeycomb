const fs = require('fs');
const path = require('path');

const rootDir = path.join(__dirname, '..', '..');

/**
 * checks if the given file is a directory
 *
 * @param  {string}  file filename
 * @return {boolean}      true / false
 */
function isDirectory(file) {
  return fs.statSync(path.join(rootDir, file)).isDirectory();
}

/**
 * checks if the folder contains a package.json-file
 *
 * @param  {string} folder foldername
 * @return {boolean}        true / false
 */
function containsPackage(folder) {
  return !!fs.readdirSync(path.join(rootDir, folder)).filter(file => file.indexOf('package.json') !== -1).length;
}

/**
 * read all projects with a package.json from the root-directory
 *
 * @return {array} list of project-folder-names
 */
function getProjects() {
  return fs.readdirSync(rootDir).filter(file => isDirectory(file) && containsPackage(file));
}

const projects = getProjects();

module.exports = projects;
