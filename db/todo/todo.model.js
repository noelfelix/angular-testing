const Sequelize = require('sequelize');

module.exports = sequelize => {
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
  }, {
    classMethods: {
      associate: models => {
        Todo.belongsTo(models.user, {
          onDelete: "CASCADE",
          foreignKey: {
            allowNull: false
          }
        });
      }
    }
  });

  return Todo;
};