export default ngModule => {
  let providerName = 'loginService';

  class userService {
    constructor($http, $state, CONSTANTS, sessionService, todosService) {
      this.$http = $http;
      this.$state = $state;

      this.CONSTANTS = CONSTANTS;
      this.sessionService = sessionService;
      this.todosService = todosService;

      this.userEndpoint = CONSTANTS.USER_ENDPOINT;
    }

    onInitialLoad() {
      if(this.sessionService.isAuthenticated()) {
        this.$state.go('todos');
      }
    }

    register(username, password) {
      this.$http({
        method: 'POST',
        url: this.userEndpoint,
        data: {
          username: username,
          password: password
        }
      }).then(res => {
        console.log(res);
        this.$state.go('todos');
      }, err => {
        console.error(err);
      });
    }

    login(username, password) {
      this.$http({
        method: 'POST',
        url: `${this.userEndpoint}/${username}`,
        data: {
          password: password
        }
      }).then(res => {
        this.$state.go('todos', {
          todos: res.data.todos
        });
      }, err => {
        console.error(err);
      });
    }

    logout() {
      this.sessionService.removeSession();
      if (this.$state.current.name != 'login') {
        this.$state.go('login');
      }
    }
  }

  ngModule.service(providerName, userService);
};