const Sequelize = require('sequelize');

const db = new Sequelize('angular-testing', null, null, {
   dialect: 'sqlite',
    pool: {
     min: 0,
      max: 10,
      idle: 10000
    },
    storage: 'angular-testing.sqlite'
});

let Todo = require('./todo/todo.model')(db);
let User = require('./user/user.model')(db);

Todo.belongsTo(User);

db.sync();

module.exports = {
  Todo: Todo,
  User: User
};