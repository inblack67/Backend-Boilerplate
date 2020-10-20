"use strict";

require("core-js/modules/es.promise");

var _express = _interopRequireDefault(require("express"));

var _apolloServerExpress = require("apollo-server-express");

var _expressSession = _interopRequireDefault(require("express-session"));

require("colors");

var _dotenv = _interopRequireDefault(require("dotenv"));

var _schema = require("./schema");

var _errorHandler = _interopRequireDefault(require("./middlewares/errorHandler"));

var _connectDB = require("./connectDB");

var _constants = require("./utils/constants");

var _connectRedis = _interopRequireDefault(require("connect-redis"));

var _ioredis = _interopRequireDefault(require("ioredis"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const main = async () => {
  const RedisClient = new _ioredis.default();
  const RedisStore = (0, _connectRedis.default)(_expressSession.default);

  _dotenv.default.config({
    path: 'config.env'
  });

  (0, _connectDB.connectDB)();
  const app = (0, _express.default)();
  app.use(_express.default.json());
  app.use((0, _expressSession.default)({
    store: new RedisStore({
      client: RedisClient
    }),
    name: 'quid',
    secret: process.env.SESSION_SECRET,
    resave: false,
    // no revival
    saveUninitialized: false,
    // dont save until the cookie is generated
    cookie: {
      httpOnly: true,
      secure: _constants.__prod__,
      maxAge: 1000 * 60 * 60 * 24 // 1 day

    }
  }));
  const apolloServer = new _apolloServerExpress.ApolloServer({
    schema: _schema.schema,
    context: (_ref) => {
      let {
        req,
        res
      } = _ref;
      return {
        req,
        res,
        session: req.session,
        redis: RedisClient
      };
    }
  });
  apolloServer.applyMiddleware({
    app,
    cors: {
      credentials: true,
      origin: process.env.CLIENT_URL
    }
  });
  app.get('/', (req, res) => {
    res.send('API up and runnin');
  });
  app.use(_errorHandler.default);
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log("Server started on port ".concat(PORT).green.bold);
  });
};

main().catch(err => console.error(err));