export default {
  index: {
    handler: (request, reply) => {
      reply.view('index/index', {
        <%_ if (includeReact) { _%>
        name: 'React',
        <%_ } _%>
        <%_ if (includeHandlebars) { _%>
        name: 'Handlebars',
        <%_ } _%>
      });
    },
  },
};
