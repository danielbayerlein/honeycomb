module.exports = function indexTest() {
  this.Given(/^der Benutzer navigiert zur Seite "([^"]*)"$/, (path) => {
    browser.url(path);
  });

  this.Given(/^soll der Benutzer einen Begrüßungstext sehen$/, () => {
    const text = browser.getText('.qa-info');
    expect(text).toBe('Hello World');
  });
};
