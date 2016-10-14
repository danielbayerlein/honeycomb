module.exports = {
  ops: false,
  reporters: {
    console: [{
      module: 'good-console',
      args: [{ response: '*' }],
    }, 'stdout'],
  },
};
