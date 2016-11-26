export default ngModule => {
  let providerName = 'todosService';

  class todosService {
    constructor($http, CONSTANTS, userService) {
      this.$http = $http;

      this.CONSTANTS = CONSTANTS;
      this.userService = userService;

      this.todosEndpoint = CONSTANTS.TODOS_ENDPOINT;
      this._todos = [];
      this._completedTodos = [];
      this._unfinishedTodos = [];
    }

    set todos(todos) {
      this._todos = todos;
    }

    get todos() {
      return this._todos;
    }

    set completedTodos(todos) {
      this._completedTodos = todos;
    }

    get completedTodos() {
      return this._todos.filter(todo => todo.completed);
    }

    set unfinishedTodos(todos) {
      this._unfinishedTodos = todos;
    }

    get unfinishedTodos() {
      return this._todos.filter(todo => !todo.completed);
    }

    fetchTodos() {
      this.$http({
        method: "GET",
        url: `${this.CONSTANTS.TODOS_ENDPOINT}/${this.userService.currentUser}`
      }).then(res => {
        this.todos = res.data;
      }, err => {
        console.error(err);
      });
    }

    createTodo(task) {
      this.$http({
        method: "POST",
        url: `${this.CONSTANTS.TODOS_ENDPOINT}/${this.userService.currentUser}`,
        data: {
          task: task,
          userUsername: this.userService.currentUser
        }
      }).then(res => {
        console.log(res);
      }, err => {
        console.error(err);
      });
    }

    updateTodoStatus(id) {
      this.$http({
        method: "UPDATE",
        url: `${this.CONSTANTS.TODOS_ENDPOINT}/${id}`
      });
    }

    deleteTodo(id) {
      this.$http({
        method: "DELETE",
        url: `${this.CONSTANTS.TODOS_ENDPOINT}/${id}`
      });
    }
  }

  ngModule.service(providerName, todosService);
};