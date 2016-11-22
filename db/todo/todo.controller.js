const db = require('../db');

module.exports = {
  createTodo: newTodo => {
    return new Promise((res, rej) => {
      db.Todo.create(newTodo)
        .then(createdTodo => {
          res(createdTodo.dataValues);
        }, err => {
          rej(err);
        });
    });
  },
  retrieveTodos: username => {
    return new Promise((res, rej) => {
      db.Todo.findAll({where: {userUsername: username}})
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
          res.status(204).send();
        }, err => {
          rej(err);
        });
    });
  },
  deleteTodo: id => {
    return new Promise((res, rej) => {
      db.Todo.destroy({where: {id: id}})
        .then(data => {
          res.status(204).send();
        }, err => {
          rej(err);
        });
    });
  }
};