import controller from '../controllers/index';

export default [
  {
    method: 'GET',
    path: '/',
    config: controller.index,
  },
];
