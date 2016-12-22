/* eslint-disable no-console */
import { Suite } from 'benchmark';
import indexController from '../../../../src/server/controllers/index';

const suite = new Suite();

suite
  .add('indexController', {
    defer: true,
    fn: (deferred) => {
      const request = {};
      const reply = {
        view: () => { deferred.resolve(); },
      };

      indexController.index.handler(request, reply);
    },
  })
  .on('start', () => {
    console.log(`Starting bench for infoController at ${new Date()}`);
  })
  .on('cycle', (event) => {
    console.log(String(event.target));
  })
  .on('complete', () => {
    console.log(`Complete bench for infoController at ${new Date()}`);
  })
  .run({ async: true });
