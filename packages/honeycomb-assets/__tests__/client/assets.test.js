import React from 'react';
import ReactDom from 'react-dom';
import * as assets from '../../src/client/assets';

describe('honeycomb-assets', () => {
  it('should contains react', () => {
    expect(assets.React).toBe(React);
  });

  it('should contans react-dom', () => {
    expect(assets.ReactDom).toBe(ReactDom);
  });
});
