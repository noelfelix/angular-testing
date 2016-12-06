const constants = require('../constants'),
      User      = require('../../db/user/user.controller'),
      Todo      = require('../../db/todo/todo.controller'),
      jwt       = require('jsonwebtoken');


module.exports = {
  signup: (req, res) => {
    User.createUser(req.body)
      .then(user => {
        let data = {
          user: user,
          success: true
        };
        data.token = jwt.sign({username: user.username}, process.env.SECRET, {expiresIn: '48h'});
        res.status(201).json(data);
      }, err => {
        err.success = false;
        err.message == constants.USERNAME_TAKEN_ERROR_MESSAGE ? res.status(400).json(err) : res.status(500).json(err);
      });
  },
  signin: (req, res) => {
    User.getUser(req.params.username, req.body.password)
      .then(data => {
        console.log(data);
        Todo.retrieveTodos(data.username)
          .then(todos => {
            data.todos = todos;
            data.success = true;
            data.token = jwt.sign({username: data.username}, process.env.SECRET, {expiresIn: '48h'});
            res.json(data);
          }, err => {
            console.log(err)
            res.status(500).json(err);
          });
      }, err => {
        console.log(err)
        err.success = false;
        err == constants.USER_NOT_FOUND_MESSAGE || err == constants.INCORRECT_PASSWORD_MESSAGE ? res.status(400).json(err) : res.status(500).json(err);
      });
  }
};