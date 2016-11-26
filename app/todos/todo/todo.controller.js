export default ngModule => {
  let controllerName = 'todoController';

  class todoController {
    constructor(todosService) {
      this.todosService = todosService;
    }
  }

  ngModule.controller(controllerName, todoController);
};