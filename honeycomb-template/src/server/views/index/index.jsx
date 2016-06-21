import React, { PropTypes } from 'react';

const URL = process.env.NODE_ENV === 'production' ?
    '/javascripts/app.bundle.js' :
    '//localhost:8080/javascripts/app.bundle.js';

const Index = ({ name }) => (
  <main>
    <h1 className="qa-info">
      Hello {name}
    </h1>

    <div className="js-app"></div>
    <script src={URL}></script>
  </main>
);

Index.propTypes = {
  name: PropTypes.string,
};

export default Index;
