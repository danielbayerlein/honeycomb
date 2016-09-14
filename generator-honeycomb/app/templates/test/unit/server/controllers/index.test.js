/* global it */
import controller from '../../../../src/server/controllers/index';

it('index.Controller.handler should set the template and name to the callback-reply', () => {
  const reply = {
    view: (template, config) => {
      expect(template).toBe('index/index');
      expect(typeof config === 'object').toBeTruthy();
      expect(config.name).toBe('World');
    },
  };

  controller.index.handler({}, reply);
});
