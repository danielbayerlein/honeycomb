/** @jsx h */
import { h } from 'preact';

const Index = ({ name, baseUrl, serviceName }) => (
  <main>
    <link
      rel="stylesheet"
      type="text/css"
      href={`${baseUrl}/stylesheets/${serviceName}.bundle.css`}
    />

    <h1 className="qa-info">
      Hello {name}
    </h1>

    <div className="js-app" />
    <script src={`${baseUrl}/javascripts/${serviceName}.bundle.js`} />
  </main>
);

export default Index;
