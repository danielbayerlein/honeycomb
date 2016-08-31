export default {
  health: {
    handler: (request, reply) => {
      reply({ status: 'UP' });
    },
  },
};
