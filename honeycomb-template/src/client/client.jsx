/* global document */

import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Example from './components/Example.jsx';

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
