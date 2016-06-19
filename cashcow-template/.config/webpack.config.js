const path = require('path');
const clientDir = '../src/client/';

module.exports = env => {
  return {
    entry: path.resolve(__dirname, clientDir, 'client.js'),
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, '../dist'),
      pathinfo: !env.prod,
    },
    context: path.resolve(__dirname, clientDir),
    devtool: env.prod ? 'source-map' : 'eval',
    bail: env.prod,
    module: {
      loaders: [
        { test: /\.js(x)$/, loader: 'babel!eslint', exclude: /node_modules/ },
        { test: /\.css$/, loader: 'style!css' },
      ],
    },
  };
};
