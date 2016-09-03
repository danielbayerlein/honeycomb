import test from 'ava';
import controller from '../../../../src/server/controllers/index';

const request = {};

test('controller.index.handler', t => {
  const reply = {
    view: (template, config) => {
      t.is(template, 'index/index');
      t.true(typeof config === 'object');
      <%_ if (includeReact) { _%>
      t.is(config.name, 'React');
      <%_ } _%>
      <%_ if (includeHandlebars) { _%>
      t.is(config.name, 'Handlebars');
      <%_ } _%>
    },
  };

  controller.index.handler(request, reply);
});
