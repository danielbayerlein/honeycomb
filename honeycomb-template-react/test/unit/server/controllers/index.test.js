import test from 'ava';
import controller from '../../../../src/server/controllers/index';

const request = {};

test('controller.index.handler', t => {
  const reply = {
    view: (template, config) => {
      t.is(template, 'index/index');
      t.true(typeof config === 'object');
      t.is(config.name, 'React');
    },
  };

  controller.index.handler(request, reply);
});
