module.exports = {
  health: {
    handler: (request, reply) => {
      reply({ status: 'UP' });
    },
  },
};
