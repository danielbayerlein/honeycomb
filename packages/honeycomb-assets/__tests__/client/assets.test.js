import preact from 'preact';
import * as assets from '../../src/client/assets';

describe('honeycomb-assets', () => {
  it('should contains preact', () => {
    expect(assets.preact).toBe(preact);
  });
});
