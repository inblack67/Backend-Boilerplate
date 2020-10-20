"use strict";

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectDB = connectDB;

var _mongoose = require("mongoose");

async function connectDB() {
  if (_mongoose.connection.readyState === 1) {
    return;
  }

  try {
    await (0, _mongoose.connect)(process.env.MONGO_URI, {
      useCreateIndex: true,
      useFindAndModify: false,
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Mongo is here".blue.bold);
  } catch (err) {
    console.error("".concat(err).red.bold);
  }
}