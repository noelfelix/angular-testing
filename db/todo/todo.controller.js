const db = require('../db');

module.exports = {
  createTodo: newTodo => {
    return new Promise((res, rej) => {
      db.models.todo.create(newTodo)
        .then(createdTodo => {
          res(createdTodo.dataValues);
        }, err => {
          rej(err);
        });
    });
  },
  retrieveTodos: username => {
    return new Promise((res, rej) => {
      db.models.todo.findAll({where: {userUsername: username}})
        .then(todos => {
          res(todos);
        }, err => {
          rej(err);
        });
    });
  },
  updateStatus: (status, id) => {
    return new Promise((res, rej) => {
      db.models.todo.update(status, {where: {id: id}})
        .then(data => {
          res(data);
        }, err => {
          rej(err);
        });
    });
  },
  deleteTodo: id => {
    return new Promise((res, rej) => {
      db.models.todo.destroy({where: {id: id}})
        .then(data => {
          res(data);
        }, err => {
          rej(err);
        });
    });
  }
};