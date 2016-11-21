const morgan     = require('morgan'),
      bodyParser = require('body-parser'),
      jwt        = require('jsonwebtoken');

module.exports = (app, express) => {
  const todoRouter = express.Router();
  const userRouter = express.Router();

  require('dotenv').config();
  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../../app'));

  todoRouter.use((req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
      jwt.verify(token, process.env.SECRET, (err) => {
        if (err) {
          res.redirect("/user/");
        } else {
          next();
        }
      });
    } else {
      res.redirect("/user/");
    }
  });

  app.use('/todo', todoRouter);
  app.use('/user', userRouter);

  require('../todo/todo.routes.js')(todoRouter);
  require('../user/user.routes.js')(userRouter);
};
