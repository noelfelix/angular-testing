export default ngModule => {
  let providerName = 'loginService';

  class loginService {
    constructor($http, CONSTANTS, sessionService) {
      consle.log('DQWDQDQWDQWDQWDWQ')
      this.$http = $http;

      this.CONSTANTS = CONSTANTS;
      this.sessionService = sessionService;

      this.userEndpoint = CONSTANTS.USER_ENDPOINT;
    }

    login(username, password) {
      this.$http({
        method: 'POST',
        url: `${this.userEndpoint}/${username}`,
        data: {
          password: password
        }
      }).then(res => {
        console.log(res);
      }, err => {
        console.error(err);
      })
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
      }, err => {
        console.error(err);
      })
    }
  }

  ngModule.service(providerName, loginService);
};