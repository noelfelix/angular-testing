export default ngModule => {
  let providerName = 'sessionService';

  class sessionService {
    constructor(store, CONSTANTS) {
      console.log("EWGHSHTR")
      this.CONSTANTS = CONSTANTS;
      this.store = store;

      this.currentSessionToken;

      this.init();
    }

    init() {
      this.currentSessionToken = this.retrieveSession();
      console.log(this.currentSessionToken)
    }

    storeSession (token) {
      this.store.set(this.CONSTANTS.JWT_TOKEN_KEY, token);
      this.currentSessionToken = token;
    }

    retrieveSession() {
      return this.store.get(this.CONSTANTS.JWT_TOKEN_KEY);
    }

    isAuthenticated() {
      let token = this.retrieveSession();
      if(token) {
        let tokenParams = _parseJwt(token);
        return Math.round(new Date().getTime() / 1000) <= tokenParams.exp;
      } else {
        return false;
      }
    }
  }

  ngModule.service(providerName, sessionService);

  let _parseJwt = function(token) {
    let base64Data = token.split('.')[1];
    let base64 = base64Data.replace('-', '+').replace('_', '/');
    return JSON.parse(this.$window.atob(base64));
  }.bind(sessionService);
}