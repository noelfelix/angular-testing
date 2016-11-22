const db      = require('./db'),
      bcrypt  = require('bcrypt');

module.exports = {
  findUser: username => {
    return db.User.findOne({
      where: {
        username: username
      }
    })
  },
  hashPassword: password => {
    return new Promise((res, rej) => {
      bcrypt.hash(password, 10, (err, hash) => {
        hash ? res(hash) : rej(err);
      });
    });
  }
};