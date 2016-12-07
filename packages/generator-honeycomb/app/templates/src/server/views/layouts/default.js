/* eslint-disable react/no-danger */
import React, { PropTypes } from 'react';
import styleSheet from 'styled-components/lib/models/StyleSheet';

const Layout = ({ children, baseUrl, serviceName }) => (
  <html lang="de">
    <head>
      <style type="text/css">
        {styleSheet.rules().map(rule => rule.cssText).join('\n')}
      </style>
    </head>
    <body>
      <main dangerouslySetInnerHTML={{ __html: children }} />
      <script src={`${baseUrl}/javascripts/${serviceName}.bundle.js`} />
    </body>
  </html>
);

Layout.propTypes = {
  children: PropTypes.node,
  baseUrl: PropTypes.string,
  serviceName: PropTypes.string,
};

export default Layout;
