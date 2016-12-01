const Sequelize = require('sequelize');

module.exports = sequelize => {
  let User = sequelize.define('user', {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  }, {
    classMethods: {
      associate: models => {
        User.hasMany(models.todo);
      }
    }
  });

  return User;
};