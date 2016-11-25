const bcrypt    = require('bcryptjs');

module.exports = {
  hashPassword: password => {
    return new Promise((res, rej) => {
      bcrypt.hash(password, 10, (err, hash) => {
        hash ? res(hash) : rej(err);
      });
    });
  }
};