export default ngModule => {
  let controllerName = 'todosController';

  class todosController {
    constructor($stateParams, todosService) {
      this.$stateParams = $stateParams;
      this.todosService = todosService;
      this.newTodoItem = {
        task: ""
      };

      if (this.$stateParams.todos) {
        this.todosService.todos = this.$stateParams.todos;
      } else {
        this.todosService.fetchTodos();
      }

    }
  }

  ngModule.controller(controllerName, todosController);
};