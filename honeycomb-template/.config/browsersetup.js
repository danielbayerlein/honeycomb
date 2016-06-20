import { jsdom } from 'jsdom';

global.document = jsdom('<body></body>');
global.window = document.defaultView;
global.navgator = window.navigator;
