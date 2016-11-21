/* eslint-disable no-console */
import { Suite } from 'benchmark';
import infoController from '../../../../src/server/controllers/info';

const suite = new Suite();

suite
  .add('infoController', {
    defer: true,
    fn: (deferred) => {
      const request = {};
      const resolve = () => { deferred.resolve(); };

      infoController.info.handler(request, resolve);
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
