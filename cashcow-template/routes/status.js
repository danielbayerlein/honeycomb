import controller from '../controllers/status';

export default [
  {
    method: 'GET',
    path: '/status',
    config: controller.status,
  },
];
