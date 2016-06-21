const path = require('path');
const eslintFormatter = require('eslint-formatter-pretty');

module.exports = env => {
  return {
    entry: {
      'app': './src/client/client.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: './public/javascripts',
      publicPath: '/javascripts/',
      pathinfo: !env.prod,
    },
    devServer: {
      contentBase: './public/javascripts',
    },
    context: path.resolve(__dirname, '..'),
    devtool: env.prod ? 'source-map' : 'eval',
    bail: env.prod,
    module: {
      loaders: [
        { test: /\.(js|jsx)$/, loader: 'babel!eslint', exclude: /node_modules/ },
        { test: /\.css$/, loader: 'style!css' },
      ],
    },
    eslint: {
      formatter: eslintFormatter,
    },
  };
};
