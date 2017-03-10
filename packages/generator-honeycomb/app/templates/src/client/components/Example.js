/** @jsx h */
import { h } from 'preact';

/**
 * Example for preact on the client
 *
 * @param  {string}   name  display-name
 * @return {element}        preact-component
 */
const Example = ({ name }) => (
  <h2>Hi {name}, this is an example for rendering Preact on the client.</h2>
);

export default Example;
