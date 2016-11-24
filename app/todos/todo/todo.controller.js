export default ngModule => {
  let controllerName = 'todoController';

  class todoController {
    constructor() {

    }
  }

  ngModule.controller(controllerName, todoController);
};