export default {
  index: {
    handler: (request, reply) => {
      reply.view('index/index', {
        name: 'World',
      });
    },
  },
};
