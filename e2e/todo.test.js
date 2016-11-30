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