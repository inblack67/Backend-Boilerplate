"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mutation = void 0;

var _schema = require("@nexus/schema");

var _asyncHandler = _interopRequireDefault(require("../middlewares/asyncHandler"));

var _errorResponse = _interopRequireDefault(require("../utils/errorResponse"));

var _User = require("./User");

var _User2 = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Mutation = (0, _schema.mutationType)({
  definition: function definition(t) {
    t.typeName = 'Query';
    t.field('login', {
      type: _User.User,
      description: 'Login',
      args: {
        email: (0, _schema.stringArg)(),
        password: (0, _schema.stringArg)()
      },
      resolve: (0, _asyncHandler["default"])( /*#__PURE__*/function () {
        var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, _ref, _ref2) {
          var email, password, session, user, isMatch;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  email = _ref.email, password = _ref.password;
                  session = _ref2.session;

                  if (!session.user) {
                    _context.next = 4;
                    break;
                  }

                  throw new _errorResponse["default"]('Not Authorized', 401);

                case 4:
                  _context.next = 6;
                  return _User2["default"].findOne({
                    email: email
                  }).select('+password');

                case 6:
                  user = _context.sent;

                  if (user) {
                    _context.next = 9;
                    break;
                  }

                  throw new _errorResponse["default"]('Invalid Credentials', 403);

                case 9:
                  _context.next = 11;
                  return user.matchPassword(password);

                case 11:
                  isMatch = _context.sent;

                  if (isMatch) {
                    _context.next = 14;
                    break;
                  }

                  throw new _errorResponse["default"]('Invalid Credentials', 403);

                case 14:
                  session.user = user._id;
                  return _context.abrupt("return", {
                    name: user.name,
                    email: user.email,
                    createdAt: user.createdAt,
                    _id: user._id
                  });

                case 16:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x, _x2, _x3) {
          return _ref3.apply(this, arguments);
        };
      }())
    });
    t.field('logout', {
      type: 'String',
      description: 'Logout',
      nullable: true,
      resolve: (0, _asyncHandler["default"])( /*#__PURE__*/function () {
        var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(parent, args, _ref4) {
          var session;
          return regeneratorRuntime.wrap(function _callee2$(_context2) {
            while (1) {
              switch (_context2.prev = _context2.next) {
                case 0:
                  session = _ref4.session;

                  if (session.user) {
                    _context2.next = 3;
                    break;
                  }

                  throw new _errorResponse["default"]('Not Authorized', 401);

                case 3:
                  new Promise(function (resolve) {
                    session.destroy(function (err) {
                      if (err) {
                        console.error(err);
                      }

                      resolve(true);
                    });
                  });
                  return _context2.abrupt("return", 'Logout Successful');

                case 5:
                case "end":
                  return _context2.stop();
              }
            }
          }, _callee2);
        }));

        return function (_x4, _x5, _x6) {
          return _ref5.apply(this, arguments);
        };
      }())
    });
    t.field('register', {
      type: _User.User,
      description: 'Register',
      args: {
        name: (0, _schema.stringArg)(),
        email: (0, _schema.stringArg)(),
        password: (0, _schema.stringArg)(),
        image: (0, _schema.stringArg)()
      },
      resolve: (0, _asyncHandler["default"])( /*#__PURE__*/function () {
        var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(parent, _ref6, _ref7) {
          var name, email, password, image, session, user;
          return regeneratorRuntime.wrap(function _callee3$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  name = _ref6.name, email = _ref6.email, password = _ref6.password, image = _ref6.image;
                  session = _ref7.session;

                  if (!session.user) {
                    _context3.next = 4;
                    break;
                  }

                  throw new _errorResponse["default"]('Not Authorized', 401);

                case 4:
                  _context3.next = 6;
                  return _User2["default"].create({
                    name: name,
                    email: email,
                    password: password,
                    image: image
                  });

                case 6:
                  user = _context3.sent;
                  session.user = user._id;
                  return _context3.abrupt("return", {
                    name: user.name,
                    email: user.email,
                    createdAt: user.createdAt,
                    _id: user._id,
                    image: user.image
                  });

                case 9:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee3);
        }));

        return function (_x7, _x8, _x9) {
          return _ref8.apply(this, arguments);
        };
      }())
    });
  }
});
exports.Mutation = Mutation;