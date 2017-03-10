<%_ if (includePreact) { _%>
/** @jsx h */
import { h, render } from 'preact';
import Example from './components/Example';
<%_ } _%>
import './client.css';

<%_ if (includePreact) { _%>
function init() {
  const appEl = document.querySelector('.js-app');
  const name = 'world';

  render(<Example name={name} />, appEl);
}

document.addEventListener('DOMContentLoaded', () => {
  init();

  if (module.hot) {
    module.hot.accept('./components/Example', init);
  }
}, false);
<%_ } _%>
<%_ if (includeHandlebars) { _%>
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM has been loaded'); // eslint-disable-line no-console
}, false);
<%_ } _%>
