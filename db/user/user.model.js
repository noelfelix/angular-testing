const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  return sequelize.define('user', {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
      primaryKey: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  });
};