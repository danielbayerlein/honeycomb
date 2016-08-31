import controller from '../controllers/status';

const routes = [{
  method: 'GET',
  path: '/status',
  config: controller.status,
}];

export default routes;
