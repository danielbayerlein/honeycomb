import controller from '../controllers/info';

const routes = [{
  method: 'GET',
  path: '/info',
  config: controller.info,
}];

export default routes;
