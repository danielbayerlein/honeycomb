import React, { PropTypes } from 'react';
import styled from 'styled-components';

const StyledH2 = styled.h2`
  color: tomato;
  font-size: 2em;
`;

/**
 * Example for react on the client
 *
 * @param  {string}   name  display-name
 * @return {element}        react-component
 */
const Example = ({ name }) => (
  <StyledH2>Hi {name}, this is an example for rendering React on the client.</StyledH2>
);

Example.propTypes = {
  name: PropTypes.string,
};

export default Example;
