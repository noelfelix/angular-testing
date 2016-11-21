const todoController = require('./todo.controller');

module.exports = (app) => {
  app.get('/todo/', todoController.get);
  app.post('/todo/', todoController.post);
  app.put('/todo/', todoController.put);
};