"use strict";

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Query = void 0;

var _schema = require("@nexus/schema");

var _errorResponse = _interopRequireDefault(require("../utils/errorResponse"));

var _User = require("./User");

var _asyncHandler = _interopRequireDefault(require("../middlewares/asyncHandler"));

var _User2 = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Query = (0, _schema.queryType)({
  definition(t) {
    t.typeName = 'Query';
    t.string('hello', {
      resolve: () => 'world'
    });
    t.field('getMe', {
      type: _User.User,
      description: 'Get Logged In User',
      resolve: (0, _asyncHandler.default)(async (parent, args, _ref) => {
        let {
          session
        } = _ref;

        if (!session.user) {
          throw new _errorResponse.default('Not Authenticated', 401);
        }

        const user = await _User2.default.findById(session.user);

        if (!user) {
          throw new _errorResponse.default('Invalid Credentials', 401);
        }

        return user;
      })
    });
  }

});
exports.Query = Query;