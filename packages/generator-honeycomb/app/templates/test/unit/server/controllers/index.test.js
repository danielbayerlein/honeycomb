import controller from '../../../../src/server/controllers/index';

describe('index controller', () => {
  test('sets the template and name to the reply callback', () => {
    const reply = {
      view: (template, config) => {
        expect(template).toBe('index/index');
        expect(typeof config === 'object').toBeTruthy();
        expect(config.name).toBe('World');
      },
    };

    controller.index.handler({}, reply);
  });
});
