const log = {
  ops: false,
  reporters: {
    console: [{
      module: 'good-console',
      args: [{ response: "*" }],
    }, 'stdout'],
  }
};

export default log;
