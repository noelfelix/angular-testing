export default ngModule => {
  let controllerName = 'headerController';

  class headerController {
    constructor(userService) {
      this.userService = userService;
      this.title;
    }
  }

  ngModule.controller(controllerName, headerController);
};