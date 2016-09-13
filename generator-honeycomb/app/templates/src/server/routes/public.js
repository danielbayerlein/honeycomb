const routes = [{
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: 'public',
    },
  },
}];

export default routes;
