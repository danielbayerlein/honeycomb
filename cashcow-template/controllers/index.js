// https://github.com/semateos/stimpy-medium/blob/4166eaf261dabb60d2afe01bca2f89b489ea6e1d/server/routes/base.js

module.exports = {
  index: {
    handler: (request, reply) => {
      reply.view('index/index', {
        name: 'World',
      });
    },
  },
};
