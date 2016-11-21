const User      = require('../../db/user/controller'),
      jwt       = require('jsonwebtoken'),
      constants = require('../../constants');

module.exports = {
  signup: (req, res) => {
    User.createUser(req.body)
      .then(user => {
        res.status(201).json({success: true});
      }, err => {
        err.success = false;
        err.message == constants.USERNAME_TAKEN_ERROR_MESSAGE ? res.status(400).json(err) : res.status(500).json(err);
      });
  },
  signin: (req, res) => {
    User.signin(req.params.username, req.body.password)
      .then(data => {
        data.success = true;
        data.token = jwt.sign(data.user, process.env.SECRET, {expiresInMinutes: 2880});
        res.json(data);
      }, err => {
        err.success = false;
        err.message == constants.USER_NOT_FOUND_MESSAGE || err.message == constants.INCORRECT_PASSWORD_MESSAGE ? res.status(400).json(err) : res.status(500).json(err);
      });
  }
};