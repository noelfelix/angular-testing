import _ from 'lodash';

export default ngModule => {
  let providerName = 'todosService';

  class todosService {
    constructor($http, CONSTANTS, userService) {
      this.$http = $http;

      this.CONSTANTS = CONSTANTS;
      this.userService = userService;

      this._todos = [];
      this.completedTodos = [];
      this.unfinishedTodos = [];
    }

    set todos(todos) {
      this._todos = todos;
    }

    get todos() {
      return this._todos;
    }

    sortTodos() {
      this.completedTodos = this.todos.filter(todo => todo.completed);
      this.unfinishedTodos = this.todos.filter(todo => !todo.completed);
    }

    fetchTodos() {
      this.$http({
        method: "GET",
        url: `${this.CONSTANTS.TODOS_ENDPOINT}/${this.userService.currentUser}`
      }).then(res => {
        console.log(res);
        this.todos = res.data;
        this.sortTodos();
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
        this.todos.push(res.data.todo);
        this.unfinishedTodos.push(res.data.todo)
      }, err => {
        console.error(err);
      });
    }

    updateTodoStatus(id) {
      this.$http({
        method: "PUT",
        url: `${this.CONSTANTS.TODOS_ENDPOINT}/${id}`
      }).then(res => {
        console.log(res);
        this.sortTodos();
      }, err => {
        console.error(err);
      });
    }

    deleteTodo(id) {
      this.$http({
        method: "DELETE",
        url: `${this.CONSTANTS.TODOS_ENDPOINT}/${id}`
      }).then(res => {
        this.removeTodo(id);
        console.log(res);
      }, err => {
        console.error(err);
      });
    }

    removeTodo(id) {
      this.todos.splice(_.findIndex(this.todos, todo => todo.id === id), 1);
      this.sortTodos();
    }
  }

  ngModule.service(providerName, todosService);
};