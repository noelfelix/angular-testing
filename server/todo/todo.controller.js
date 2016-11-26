const Todo = require('../../db/todo/todo.controller');

module.exports = {
  createTodo: (req, res) => {
    console.log(req, res)
    Todo.createTodo(req.body)
      .then(todo => {
        res.status(201).json({
          success: true,
          todo: todo});
      }, err => {
        console.log(err)
        res.status(500).json(err);
      });
  },
  retrieveTodos: (req, res) => {
    Todo.retrieveTodos(req.params.username)
      .then(todos => {
        res.json(todos);
      }, err => {
        res.status(500).json(err);
      });
  },
  updateTodo: (req, res) => {
    Todo.updateStatus(req.body, req.params.id)
      .then(data => {
        res.status(200).json(data);
      }, err => {
        console.log(err)
        res.status(500).json(err);
      });
  },
  deleteTodo: (req, res) => {
    Todo.deleteTodo(req.params.id)
      .then(data => {
      res.status(200).json(data);
    }, err => {
      res.status(500).json(err);
    });
  }
};