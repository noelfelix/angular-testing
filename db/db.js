const Sequelize = require('sequelize'),
      fixtures  = require('sequelize-fixtures'),
      helpers   = require('./helpers'),
      path      = require('path'),
      fs        = require('fs');

const sequelize = new Sequelize('angular-testing', null, null, {
   dialect: 'sqlite',
    pool: {
     min: 0,
      max: 10,
      idle: 10000
    },
    storage: 'angular-testing.sqlite'
});

const db = {
  sequelize,
  Sequelize,
  models: {}
};

const models = db.models;

fs.readdirSync(__dirname)
  .filter(name => fs.statSync(path.resolve(__dirname, name)).isDirectory())
  .reduce((files, dir) => files.concat(fs.readdirSync(path.resolve(__dirname, dir))
    .filter(file => file.includes('.model'))
    .map(file => `${dir}/${file}`)), []
  )
  .forEach(file => {
    let model = sequelize.import(path.join(__dirname, file));
    models[model.name] = model
  });

Object.keys(models).forEach(modelName => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

//Workaround for using fixtures and bcrypt
let password;
helpers.hashPassword('password').then(encryptedPw => {
  password = encryptedPw;

  //Drop and create tables before loading fixtures
  Promise.all(Object.keys(models).map(key => models[key].sync({force: true})))
    .then(() => {
      fixtures.loadFile(path.resolve(__dirname, 'fixture-data.json'), models, {
        transformFixtureDataFn: data => {
          if (data.password) {
            data.password = password;
          }
          return data;
        }
      });
  });
});


module.exports = db;