export default ngModule => {
  let providerName = 'todosService';

  class todosService {
    constructor() {

    }
  }

  ngModule.service(providerName, todosService);
};