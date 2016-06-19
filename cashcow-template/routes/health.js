import controller from '../controllers/health';

module.exports = [
  {
    method: 'GET',
    path: '/health',
    config: controller.health,
  },
];
