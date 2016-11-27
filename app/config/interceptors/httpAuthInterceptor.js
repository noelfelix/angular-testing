export default ngModule => {

  let providerName = 'httpAuthInterceptor';

  function httpAuthInterceptor(sessionService) {
    return {
      request: (config) => {
        let token = sessionService.retrieveSession();
        if (token) {
            config.headers['X-Access-Token'] = token;
        }
        return config;
      },

      response: (res) => {
        let token = res.data.token;
        if (token) {
          sessionService.storeSession(token);
        }
        return res;
      }
    }
  }

  ngModule.factory(providerName, httpAuthInterceptor);
};