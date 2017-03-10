/** @jsx h */
import { h } from 'preact';

/**
 * Example for react on the client
 *
 * @param  {string}   name  display-name
 * @return {element}        react-component
 */
const Example = ({ name }) => (
  <h2>Hi {name}, this is an example for rendering React on the client.</h2>
);

export default Example;
