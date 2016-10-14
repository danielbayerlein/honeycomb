import pkg from '../../../package.json';

export default {
  info: {
    handler: (request, reply) => {
      reply({
        name: pkg.name,
        version: pkg.version,
        description: pkg.description,
        author: pkg.author,
        contributors: pkg.contributors,
        env: process.env.NODE_ENV,
        uptime: process.uptime(),
        memory: process.memoryUsage(),
        cpu: process.cpuUsage(),
        node: process.version,
      });
    },
  },
};
