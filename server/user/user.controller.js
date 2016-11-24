const constants = require('../constants'),
      User      = require('../../db/user/user.controller'),
      jwt       = require('jsonwebtoken');


module.exports = {
  signup: (req, res) => {
    User.createUser(req.body)
      .then(user => {
        let data = {
          user: user,
          success: true
        };
        data.token = jwt.sign({user: user.username}, process.env.SECRET, {expiresIn: '48h'});
        res.status(201).json(data);
      }, err => {
        err.success = false;
        err.message == constants.USERNAME_TAKEN_ERROR_MESSAGE ? res.status(400).json(err) : res.status(500).json(err);
      });
  },
  signin: (req, res) => {
    User.signin(req.params.username, req.body.password)
      .then(data => {
        data.success = true;
        data.token = jwt.sign({user: data.user.username}, process.env.SECRET, {expiresIn: '48h'});
        res.json(data);
      }, err => {
        err.success = false;
        err.message == constants.USER_NOT_FOUND_MESSAGE || err.message == constants.INCORRECT_PASSWORD_MESSAGE ? res.status(400).json(err) : res.status(500).json(err);
      });
  }
};