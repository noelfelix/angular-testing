const todoController = require('./todo.controller');

module.exports = (app) => {
  app.post('/:username', todoController.createTodo);
  app.get('/:username', todoController.retrieveTodos);
  app.put('/:username/:id', todoController.updateTodo);
  app.delete('/:username/:id', todoController.deleteTodo);
};