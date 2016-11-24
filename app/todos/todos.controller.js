export default ngModule => {
  let controllerName = 'todosController';

  class todosController {
    constructor() {

    }
  }

  ngModule.controller(controllerName, todosController);
};