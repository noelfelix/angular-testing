const Sequelize = require('sequelize');
const User = require('../user/user.model');

module.exports = (sequelize) => {
  return sequelize.define('todo', {
    task: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true
    },
    user: {
      type:Sequelize.STRING,
      references: {
        model: User,
        key: 'username'
      }
    },
    completed: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });
};