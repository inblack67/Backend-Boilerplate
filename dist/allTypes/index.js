"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  GQLDATE: true
};
exports.GQLDATE = void 0;

var _schema = require("@nexus/schema");

var _graphqlScalars = require("graphql-scalars");

var _Mutation = require("./Mutation");

Object.keys(_Mutation).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Mutation[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Mutation[key];
    }
  });
});

var _Query = require("./Query");

Object.keys(_Query).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _Query[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _Query[key];
    }
  });
});

var _User = require("./User");

Object.keys(_User).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  if (key in exports && exports[key] === _User[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _User[key];
    }
  });
});
const GQLDATE = (0, _schema.decorateType)(_graphqlScalars.GraphQLDate, {
  rootTyping: 'Date',
  asNexusMethod: 'date'
});
exports.GQLDATE = GQLDATE;