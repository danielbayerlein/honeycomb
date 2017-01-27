Feature('Welcome page');

Scenario('receive a welcome message', (I) => {
  I.amOnPage('/');
  I.see('Hello World', '.qa-info');
});
