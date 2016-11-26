export default ngModule => {
  let providerName = 'userService';

  class userService {
    constructor($http, $state, CONSTANTS, sessionService) {
      this.$http = $http;
      this.$state = $state;

      this.CONSTANTS = CONSTANTS;
      this.sessionService = sessionService;

      this.currentUser;
      this.userEndpoint = CONSTANTS.USER_ENDPOINT;

      if(this.sessionService.isAuthenticated()) {
        this.currentUser = this.sessionService.getCurrentSessionUser();
        this.$state.go('todos');
      }
    }

    onInitialLoad() {
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
        this.currentUser = this.sessionService.getCurrentSessionUser();
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
        this.currentUser = this.sessionService.getCurrentSessionUser();
        this.$state.go('todos', {
          todos: res.data.todos
        });
      }, err => {
        console.error(err);
      });
    }

    logout() {
      this.sessionService.removeSession();
      this.currentUser = undefined;
      if (this.$state.current.name != 'login') {
        this.$state.go('login');
      }
    }
  }

  ngModule.service(providerName, userService);
};