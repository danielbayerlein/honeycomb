import React, { PropTypes } from 'react';

const Index = ({ name }) => (
  <main>
    <h1 className="qa-info">
      Hello {name}
    </h1>

    <div className="js-app"></div>
    <script src="/javascripts/app.bundle.js"></script>
  </main>
);

Index.propTypes = {
  name: PropTypes.string,
};

export default Index;
