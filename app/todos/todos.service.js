export default ngModule => {
  let providerName = 'todosService';

  class todosService {
    constructor() {
      this._todos = [];
    }

    set todos(todos) {
      this._todos = todos;
    }

    get todos() {
      return this._todos;
    }
  }

  ngModule.service(providerName, todosService);
};