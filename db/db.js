const Sequelize = require('sequelize'),
      fixtures  = require('sequelize-fixtures'),
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

let db = {
  models: {}
};

let models = db.models;

fs.readdirSync(__dirname)
  .filter(name => fs.statSync(path.resolve(__dirname, name)).isDirectory())
  .reduce((files, dir) => files.concat(fs.readdirSync(path.resolve(__dirname, dir)).filter(file => file.includes('.model')).map(file => `${dir}/${file}`)), [])
  .forEach(file => {
    let model = sequelize.import(path.join(__dirname, file));
    models[model.name] = model
  });

Object.keys(models).forEach(modelName => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

sequelize.sync({force:true});

Object.keys(models).forEach(modelName => models[modelName].sync());

fixtures.loadFile(path.resolve(__dirname, 'fixture-data.json'), models);

module.exports = db;