"use strict";

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = require("mongoose");

var _bcryptjs = require("bcryptjs");

const UserSchema = new _mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required']
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: [true, 'Invalid Credentials'],
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Add a valid email']
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: [8, 'Password must be 8 chars'],
    maxlength: [16, 'Password cannot exceed 16 chars'],
    select: false
  },
  image: {
    type: String,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now()
  }
}, {
  toJSON: {
    virtuals: true
  },
  toObject: {
    virtuals: true
  }
});
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await (0, _bcryptjs.genSalt)(10);
  this.password = await (0, _bcryptjs.hash)(this.password, salt);
  next();
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await (0, _bcryptjs.compare)(enteredPassword, this.password);
};

var _default = _mongoose.models && _mongoose.models.User || (0, _mongoose.model)('User', UserSchema);

exports.default = _default;