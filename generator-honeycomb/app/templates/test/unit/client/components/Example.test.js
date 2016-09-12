import test from 'ava';
import React from 'react';
import { shallow } from 'enzyme';
import Example from '../../../../src/client/components/Example';

test('Example should exists', t => {
  const el = shallow(<Example />);

  t.not(el.html(), null);
});

test('Example should render the given name', t => {
  const name = 'bee';
  const el = shallow(<Example name={name} />);

  t.true(el.html().indexOf(name) !== -1);
});
