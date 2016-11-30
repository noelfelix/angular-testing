export default ngModule => {
  let controllerName = 'todosController';

  class todosController {
    constructor($stateParams, todosService) {
      this.$stateParams = $stateParams;
      this.todosService = todosService;

      if (this.$stateParams.todos) {
        this.todosService.todos = this.$stateParams.todos;
      } else {
        this.todosService.fetchTodos();
      }

    }
  }

  ngModule.controller(controllerName, todosController);
};