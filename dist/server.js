"use strict";

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

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var main = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var RedisClient, RedisStore, app, apolloServer, PORT;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            RedisClient = new _ioredis["default"]();
            RedisStore = (0, _connectRedis["default"])(_expressSession["default"]);

            _dotenv["default"].config({
              path: 'config.env'
            });

            (0, _connectDB.connectDB)();
            app = (0, _express["default"])();
            app.use(_express["default"].json());
            app.use((0, _expressSession["default"])({
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
            apolloServer = new _apolloServerExpress.ApolloServer({
              schema: _schema.schema,
              context: function context(_ref2) {
                var req = _ref2.req,
                    res = _ref2.res;
                return {
                  req: req,
                  res: res,
                  session: req.session,
                  redis: RedisClient
                };
              }
            });
            apolloServer.applyMiddleware({
              app: app,
              cors: {
                credentials: true,
                origin: process.env.CLIENT_URL
              }
            });
            app.get('/', function (req, res) {
              res.send('API up and runnin');
            });
            app.use(_errorHandler["default"]);
            PORT = process.env.PORT || 5000;
            app.listen(PORT, function () {
              console.log("Server started on port ".concat(PORT).green.bold);
            });

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function main() {
    return _ref.apply(this, arguments);
  };
}();

main()["catch"](function (err) {
  return console.error(err);
});