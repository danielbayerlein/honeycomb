Feature('Welcome page');

Scenario('check Welcome page on site', (I) => {
  I.amOnPage('/');
  I.see('Hello World', '.qa-info');
});
