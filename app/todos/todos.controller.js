export default ngModule => {
  let controllerName = 'todosController';

  class todosController {
    constructor(userService, todosService) {
      this.userService = userService;
      this.todosService = todosService;
      this.newTodoItem = {
        task: ""
      };
    }
  }

  ngModule.controller(controllerName, todosController);
};