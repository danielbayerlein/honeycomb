import controller from '../controllers/index';

module.exports = [
  {
    method: 'GET',
    path: '/',
    config: controller.index,
  },
];
