import React, { PropTypes } from 'react';

const Index = ({ name }) => (
  <div className="qa-info">Hello {name}</div>
);

Index.propTypes = {
  name: PropTypes.string,
};

export default Index;
