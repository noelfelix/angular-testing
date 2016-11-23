export default ngModule => {
  let controllerName = 'loginController';

  class loginController {
    constructor(loginService) {
      this.loginService = loginService;
      this.username;
      this.password;
    }
  }

  console.log(ngModule)
  ngModule.controller(controllerName, loginController);
};