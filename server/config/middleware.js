const bodyParser = require('body-parser'),
      morgan     = require('morgan'),
      path       = require('path'),
      jwt        = require('jsonwebtoken');

module.exports = (app, express) => {
  const todoRouter = express.Router();
  const userRouter = express.Router();

  require('dotenv').config();
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(path.normalize(__dirname + '/../../')));

  app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "X-Access-Token, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
  });

  app.get('/', (req, res) => {
    res.sendFile(path.normalize(__dirname + '/../../app/index.html'));
  });

  todoRouter.use((req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['X-Access-Token'];

    if (token) {
      jwt.verify(token, process.env.SECRET, (err) => {
        if (err) {
          res.redirect("/");
        } else {
          next();
        }
      });
    } else {
      res.redirect("/");
    }
  });

  app.use('/todos', todoRouter);
  app.use('/user', userRouter);

  require('../todo/todo.routes.js')(todoRouter);
  require('../user/user.routes.js')(userRouter);
};
