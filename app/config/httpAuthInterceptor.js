export default ngModule => {

  let providerName = 'httpAuthInterceptor';

  class httpAuthInterceptor {
    constructor(store, CONSTANTS) {
      this.store = store;
      this.CONSTANTS = CONSTANTS;
    }

    request (config) {

    }

    response (config) {
      console.log(config);
    }

    parseJwt (token) {
      let base64Data = token.split('.')[1];
      let base64 = base64Data.replace('-', '+').replace('_', '/');
      return JSON.parse(this.$window.atob(base64));
    }

    saveToken (token) {
      this.store.set(this.CONSTANTS.JWT_TOKEN_KEY, token);
    }

    getToken() {
      return this.store.get(this.CONSTANTS.JWT_TOKEN_KEY);
    }

    isAuthenticated() {
      let token = this.getToken();
      if(token) {
        let tokenParams = this.parseJwt(token);
        return Math.round(new Date().getTime() / 1000) <= params.exp;
      } else {
        return false;
      }
    }
  }

  ngModule.service(providerName, httpAuthInterceptor);
}