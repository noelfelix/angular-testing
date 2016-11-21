const Todo      = require('../../db/todo/controller'),
      constants = require('../../constants');

module.exports = {
  createTodo: (req, res) => {
    Todo.createTodo(req.body.todo)
      .then(todo => {
        res.status(201).json({
          success: true,
          todo: todo
        }, err => {
          res.status(500).json(err);
        });
      });
  },
  retrieveTodos: (req, res) => {
    Todo.retrieveTodo(req.params.username)
      .then(todos => {
        res.json(todos);
      }, err => {
        res.status(500).json(err);
      });
  },
  updateTodo: (req, res) => {
    Todo.updateStatus(req.body.status, req.body.id)
      .then(data => {
        res.status(200).json(data);
      }, err => {
        res.status(500).json(err);
      });
  },
  deleteTodo: (req, res) => {
    Todo.deleteTodo(req.body.id)
      .then(data => {
      res.status(200).json(data);
    }, err => {
      res.status(500).json(err);
    });
  }
};