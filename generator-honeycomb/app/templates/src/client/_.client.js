/* global document */

<%_ if (includeReact) { _%>
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Example from './components/Example';

const appEl = document.querySelector('.js-app');
const name = 'world';

render(
  <AppContainer>
    <Example name={name} />
  </AppContainer>,
  appEl
);

if (module.hot) {
  module.hot.accept(() => {
    render(
      <AppContainer>
        <Example name={name} />
      </AppContainer>,
      appEl
    );
  });
}
<%_ } _%>
<%_ if (includeHandlebars) { _%>
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM has been loaded'); // eslint-disable-line no-console
}, false);
<%_ } _%>
