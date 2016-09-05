/* global it */
import React from 'react';
import renderer from 'react-test-renderer';
import Example from '../../../../src/client/components/Example';

it('should render correctly', () => {
  const tree = renderer.create(<Example />).toJSON();
  // https://facebook.github.io/jest/#react-react-native-and-snapshot-testing
  expect(tree).toMatchSnapshot();
});
