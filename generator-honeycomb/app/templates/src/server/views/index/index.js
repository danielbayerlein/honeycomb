import React, { PropTypes } from 'react';

const Index = ({ name }) => (
  <main>
    <h1 className="qa-info">
      Hello {name}
    </h1>

    <div className="js-app" />
    <script src="/javascripts/app.bundle.js" />
  </main>
);

Index.propTypes = {
  name: PropTypes.string,
};

export default Index;
