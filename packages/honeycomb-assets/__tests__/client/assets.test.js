import preact from 'preact';
import * as assets from '../../src/client/assets';

describe('honeycomb-assets', () => {
  test('contains preact', () => {
    expect(assets.preact).toBe(preact);
  });
});
