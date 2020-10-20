"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.userSessionIdPrefix = exports.redisSessionIdPrefix = exports.__prod__ = void 0;

const __prod__ = process.env.NODE_ENV === 'production';

exports.__prod__ = __prod__;
const redisSessionIdPrefix = 'sess:';
exports.redisSessionIdPrefix = redisSessionIdPrefix;
const userSessionIdPrefix = 'sess-user:';
exports.userSessionIdPrefix = userSessionIdPrefix;