import controller from '../controllers/health';

export default [
  {
    method: 'GET',
    path: '/health',
    config: controller.health,
  },
];
