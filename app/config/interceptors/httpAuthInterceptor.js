export default ngModule => {

  let providerName = 'httpAuthInterceptor';

  class httpAuthInterceptor {
    constructor($controller, sessionService) {
      this.$controller = $controller;
      this.sessionService = sessionService;
    }

    request (config) {
      console.log(config);
      return config;
    }

    response (res) {
      console.log(res);
      return res;
    }
  }

  ngModule.service(providerName, httpAuthInterceptor);
}