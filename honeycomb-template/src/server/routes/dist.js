export default [{
  method: 'GET',
  path: '/dist/{param*}',
  handler: {
    directory: {
      path: 'dist',
    },
  },
}];
