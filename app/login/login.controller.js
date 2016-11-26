export default ngModule => {
  let controllerName = 'loginController';

  class loginController {
    constructor(userService) {
      this.userService = userService;

      this.username;
      this.password;
    }
  }

  ngModule.controller(controllerName, loginController);
};