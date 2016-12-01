const constants = require('../../server/constants'),
      helpers   = require('../helpers'),
      bcrypt    = require('bcryptjs'),
      db        = require('../db');

module.exports = {
  createUser: newUser => {
    return new Promise((res, rej) => {
        db.User.findOne({where: {username: newUser.username}})
        .then(user => {
          if (user) {
            rej(new Error(constants.USERNAME_TAKEN_ERROR_MESSAGE));
          } else {
            helpers.hashPassword(newUser.password)
              .then(saltedHash => {
                newUser.password = saltedHash;
                db.User.create(newUser)
                  .then(createdUser => {
                    delete createdUser.dataValues.password;
                    res(createdUser.dataValues);
                  });
              }, err => {
                console.log(err);
                rej(err);
              });
          }
        }, err => {
          console.log(err);
          rej(err);
        });
    });
  },
  getUser: (username, password) => {
    return new Promise((res, rej) => {
      db.User.findOne({where: {username: username}}, {include: [ db.Todo ]})
          .then(user => {
            if (user) {
              bcrypt.compare(password, user.password, (err, match) => {
                if (err) {
                  rej(err)
                } else if (match) {
                  delete user.dataValues.password;
                  res(user.dataValues);
                } else {
                  rej(constants.INCORRECT_PASSWORD_MESSAGE);
                }
              });
            } else {
              rej(constants.USER_NOT_FOUND_MESSAGE);
            }
          }, err => {
            rej(err);
          });
    });
  }
};