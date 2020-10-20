"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Query = void 0;

var _schema = require("@nexus/schema");

var _errorResponse = _interopRequireDefault(require("../utils/errorResponse"));

var _User = require("./User");

var _asyncHandler = _interopRequireDefault(require("../middlewares/asyncHandler"));

var _User2 = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var Query = (0, _schema.queryType)({
  definition: function definition(t) {
    t.typeName = 'Query';
    t.string('hello', {
      resolve: function resolve() {
        return 'world';
      }
    });
    t.field('getMe', {
      type: _User.User,
      description: 'Get Logged In User',
      resolve: (0, _asyncHandler["default"])( /*#__PURE__*/function () {
        var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(parent, args, _ref) {
          var session, user;
          return regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  session = _ref.session;

                  if (session.user) {
                    _context.next = 3;
                    break;
                  }

                  throw new _errorResponse["default"]('Not Authenticated', 401);

                case 3:
                  _context.next = 5;
                  return _User2["default"].findById(session.user);

                case 5:
                  user = _context.sent;

                  if (user) {
                    _context.next = 8;
                    break;
                  }

                  throw new _errorResponse["default"]('Invalid Credentials', 401);

                case 8:
                  return _context.abrupt("return", user);

                case 9:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee);
        }));

        return function (_x, _x2, _x3) {
          return _ref2.apply(this, arguments);
        };
      }())
    });
  }
});
exports.Query = Query;