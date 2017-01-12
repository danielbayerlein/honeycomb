import React, { PropTypes } from 'react';

import styled from 'styled-components';

const DIV = styled.div`
  border: 1px solid tomato;
  padding: 20px;
`;

const Index = ({ name }) => (
  <DIV>
    <h1 className="qa-info">
      Hello {name}
    </h1>

    <div className="js-app" />
  </DIV>
);

Index.propTypes = {
  name: PropTypes.string.isRequired,
};

export default Index;
