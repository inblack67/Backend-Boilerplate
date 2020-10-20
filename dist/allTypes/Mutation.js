"use strict";

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Mutation = void 0;

var _schema = require("@nexus/schema");

var _asyncHandler = _interopRequireDefault(require("../middlewares/asyncHandler"));

var _errorResponse = _interopRequireDefault(require("../utils/errorResponse"));

var _User = require("./User");

var _User2 = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const Mutation = (0, _schema.mutationType)({
  definition(t) {
    t.typeName = 'Query';
    t.field('login', {
      type: _User.User,
      description: 'Login',
      args: {
        email: (0, _schema.stringArg)(),
        password: (0, _schema.stringArg)()
      },
      resolve: (0, _asyncHandler.default)(async (parent, _ref, _ref2) => {
        let {
          email,
          password
        } = _ref;
        let {
          session
        } = _ref2;

        if (session.user) {
          throw new _errorResponse.default('Not Authorized', 401);
        }

        const user = await _User2.default.findOne({
          email
        }).select('+password');

        if (!user) {
          throw new _errorResponse.default('Invalid Credentials', 403);
        }

        const isMatch = await user.matchPassword(password);

        if (!isMatch) {
          throw new _errorResponse.default('Invalid Credentials', 403);
        }

        session.user = user._id;
        return {
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          _id: user._id
        };
      })
    });
    t.field('logout', {
      type: 'String',
      description: 'Logout',
      nullable: true,
      resolve: (0, _asyncHandler.default)(async (parent, args, _ref3) => {
        let {
          session
        } = _ref3;

        if (!session.user) {
          throw new _errorResponse.default('Not Authorized', 401);
        }

        new Promise(resolve => {
          session.destroy(err => {
            if (err) {
              console.error(err);
            }

            resolve(true);
          });
        });
        return 'Logout Successful';
      })
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
      resolve: (0, _asyncHandler.default)(async (parent, _ref4, _ref5) => {
        let {
          name,
          email,
          password,
          image
        } = _ref4;
        let {
          session
        } = _ref5;

        if (session.user) {
          throw new _errorResponse.default('Not Authorized', 401);
        }

        const user = await _User2.default.create({
          name,
          email,
          password,
          image
        });
        session.user = user._id;
        return {
          name: user.name,
          email: user.email,
          createdAt: user.createdAt,
          _id: user._id,
          image: user.image
        };
      })
    });
  }

});
exports.Mutation = Mutation;