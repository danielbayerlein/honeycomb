import React from 'react';
import { render } from 'react-dom';
import Example from './components/Example.jsx';

render(
  <Example name="peter" />,
  document.querySelector('.js-app')
);
