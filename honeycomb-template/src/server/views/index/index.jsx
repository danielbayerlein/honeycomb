import React, { PropTypes } from 'react';

const Index = ({ name }) => (
  <main>
    <div className="qa-info">
      Hello {name}
    </div>

    <div className="js-app"></div>
    <script src="/dist/bundle.js"></script>
  </main>
);

Index.propTypes = {
  name: PropTypes.string,
};

export default Index;
