import controller from '../controllers/health';

const routes = [{
  method: 'GET',
  path: '/health',
  config: controller.health,
}];

export default routes;
