const path = require('path');
const eslintFormatter = require('eslint-formatter-pretty');

const withHotLoad = { test: /\.(js|jsx)$/, loader: 'react-hot!babel!eslint', exclude: /node_modules/ };
const normal = { test: /\.(js|jsx)$/, loader: 'babel!eslint', exclude: /node_modules/ };

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
    hot: !env.prod,
    module: {
      loaders: [
        env.prod ? normal : withHotLoad,
        { test: /\.css$/, loader: 'style!css' },
      ],
    },
    eslint: {
      formatter: eslintFormatter,
    },
  };
};
