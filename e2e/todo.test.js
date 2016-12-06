/*
* To run e2e test(s):
* - "node server/server.js" in a terminal (replace with command to start node server)
* - "webdriver-manager start" in another
* - "protractor" in another
* */

describe('basicTodoLogin', () => {

  it('should login a user', () => {
    let userNameInput, passwordInput, loginButton;

    userNameInput = element(by.model('vm.username'));
    passwordInput = element(by.model('vm.password'));
    loginButton = element(by.id('login-button'));

    browser.get('http://127.0.0.1:9000');

    expect(browser.getCurrentUrl()).not.toContain('todos');

    userNameInput.sendKeys('username');
    passwordInput.sendKeys('password');
    loginButton.click();

    expect(browser.getCurrentUrl()).toContain('todos');
  });
});