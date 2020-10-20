"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.User = void 0;

var _schema = require("@nexus/schema");

const User = (0, _schema.objectType)({
  name: 'User',

  definition(t) {
    t.string('name');
    t.string('email');
    t.string('image');
    t.string('password', {
      nullable: true
    });
    t.id('_id');
    t.date('createdAt');
  }

});
exports.User = User;