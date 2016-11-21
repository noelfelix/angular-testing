const morgan = require('morgan'),
  bodyParser = require('body-parser');

module.exports = (app, express) => {
  require('dotenv').config();

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../app'));

  require('../todo/todo.routes.js')(app);
};
