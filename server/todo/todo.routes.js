const todoController = require('./todo.controller');

module.exports = (app) => {
  app.post('/:username', todoController.createTodo);
  app.get('/:username', todoController.retrieveTodos);
  app.put('/:id', todoController.updateTodo);
  app.delete('/:id', todoController.deleteTodo);
};