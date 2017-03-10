/** @jsx h */
import { h } from 'preact';
import render from 'preact-render-to-string';
import Example from '../../../../src/client/components/Example';

it('should render correctly', () => {
  const tree = render(<Example name="World" />);
  expect(tree).toMatchSnapshot();
});
