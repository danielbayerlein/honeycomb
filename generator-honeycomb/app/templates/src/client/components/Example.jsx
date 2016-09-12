import React, { PropTypes } from 'react';

/**
 * Example for react on the client
 *
 * @param  {string}   name  display-name
 * @return {element}        react-component
 */
const Example = ({ name }) => (
  <h2>Hi {name}, this is an example for rendering React on the client.</h2>
);

Example.propTypes = {
  name: PropTypes.string,
};

export default Example;
