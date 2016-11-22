const userController = require('./user.controller');

module.exports = (app) => {
  app.post('/', userController.signup);
  app.post('/:username', userController.signin);
};