"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectDB = connectDB;

var _mongoose = require("mongoose");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function connectDB() {
  return _connectDB.apply(this, arguments);
}

function _connectDB() {
  _connectDB = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(_mongoose.connection.readyState === 1)) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return");

          case 2:
            _context.prev = 2;
            _context.next = 5;
            return (0, _mongoose.connect)(process.env.MONGO_URI, {
              useCreateIndex: true,
              useFindAndModify: false,
              useNewUrlParser: true,
              useUnifiedTopology: true
            });

          case 5:
            console.log("Mongo is here".blue.bold);
            _context.next = 11;
            break;

          case 8:
            _context.prev = 8;
            _context.t0 = _context["catch"](2);
            console.error("".concat(_context.t0).red.bold);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 8]]);
  }));
  return _connectDB.apply(this, arguments);
}