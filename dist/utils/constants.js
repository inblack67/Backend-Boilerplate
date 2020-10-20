"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userSessionIdPrefix = exports.redisSessionIdPrefix = exports.__prod__ = void 0;

var __prod__ = process.env.NODE_ENV === 'production';

exports.__prod__ = __prod__;
var redisSessionIdPrefix = 'sess:';
exports.redisSessionIdPrefix = redisSessionIdPrefix;
var userSessionIdPrefix = 'sess-user:';
exports.userSessionIdPrefix = userSessionIdPrefix;