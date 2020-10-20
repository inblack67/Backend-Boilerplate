"use strict";

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _errorResponse = _interopRequireDefault(require("../utils/errorResponse"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _default = fn => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(err => {
  let error = _objectSpread({}, err);

  error.message = err.message;

  if (err.name === 'CastError') {
    const message = "Resource not found";
    error = new _errorResponse.default(message, 404);
  }

  if (err.code === 11000) {
    const message = "Resource already exists";
    error = new _errorResponse.default(message, 400);
  }

  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(value => value.message);
    error = new _errorResponse.default(message, 400);
  }

  throw new _errorResponse.default(error.message || 'Server Error', error.statusCode || 500);
});

exports.default = _default;