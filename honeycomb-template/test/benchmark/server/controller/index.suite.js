/* global suite bench */
import indexController from '../../../../src/server/controllers/index';

const replyMock = {
  view: (page, model) => ({ page, model }),
};

suite('indexController', () => {
  bench('handler', () => {
    indexController.index.handler('', replyMock);
  });
});
