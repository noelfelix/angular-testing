const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  let Todo = sequelize.define('todo', {
    task: {
      type: Sequelize.STRING,
      allowNull: false
    },
    completed: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false
    }
  });
  return Todo;
};