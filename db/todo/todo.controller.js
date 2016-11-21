const constants = require('../../constants'),
      helpers   = require('../helpers'),
      db        = require('../db');

module.exports = {
  createTodo: newTodo => {
    return new Promise((res, rej) => {
      db.Todo.create(newTodo)
        .then(createdTodo => {
          res(createdTodo);
        }, err => {
          rej(err);
        });
    });
  },
  retrieveTodos: username => {
    return new Promise((res, rej) => {
      db.Todo.findAll({where: {username: username}})
        .then(todos => {
          res(todos);
        }, err => {
          rej(err);
        });
    });
  },
  updateStatus: (status, id) => {
    return new Promise((res, rej) => {
      db.Todo.update(status, {where: {id: id}})
        .then(data => {
          res(data);
        }, err => {
          rej(err);
        });
    });
  },
  deleteTodo: id => {
    db.Todo.destroy({where: {id: id}})
      .then(data => {
        res(data);
      }, err => {
        rej(err);
      });
  }
};