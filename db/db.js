const Sequelize = require('sequelize');

const sequelize = new Sequelize('todo', null, null, {
   dialect: 'sqlite',
    pool: {
     min: 0,
      max: 10,
      idle: 10000
    },
    storage: 'todo.sqlite'
});

const Todo = require('./todo/todo.model');
const User = require('./user/user.model');

module.exports = {
  Todo: Todo,
  User: User
};