import controller from '../controllers/index';

const routes = [{
  method: 'GET',
  path: '/',
  config: controller.index,
}];

export default routes;
