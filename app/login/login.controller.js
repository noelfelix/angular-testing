export default ngModule => {
  let controllerName = 'loginController';

  class loginController {
    constructor(userService) {
      this.userService = userService;

      this.username;
      this.password;

      this.userService.onInitialLoad();
    }
  }

  ngModule.controller(controllerName, loginController);
};