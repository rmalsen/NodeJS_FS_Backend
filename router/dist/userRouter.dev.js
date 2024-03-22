"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var express = require("express");

var User = require("../models/userModel");

var bcrypt = require("bcrypt");

var router = express.Router();

var mongoose = require("mongoose");

var _require = require("../db/db.js"),
    connect = _require.connect,
    disconnect = _require.disconnect,
    findUser = _require.findUser,
    saveUser = _require.saveUser;

router.post("/register", function (req, res, next) {
  findUser({
    email: req.body.email
  }).then(function (user) {
    if (user) {
      // User already exists
      return res.status(409).json({
        message: "User exist, try loggin in"
      });
    } else {
      //    Initialize a new user model and assign request body to it
      // Create a new user
      var newUser = new User(_objectSpread({
        _id: new mongoose.Types.ObjectId()
      }, req.body)); // encrypt the password

      bcrypt.hash(newUser.password, 10, function (err, hash) {
        if (err) {
          // Error handling the password
          return res.status(500).json({
            message: "Error " + err.message
          });
        } else {
          // set the hashed password and save the new user
          newUser.password = hash;
          saveUser(newUser).then(function (dbUser) {
            // User saved successfully
            return res.status(201).json({
              message: "Successful Registration",
              user: dbUser
            });
          })["catch"](function (err) {
            return res.status(500).json({
              message: err.message
            });
          });
        }
      });
    }
  })["catch"](function (err) {
    return res.status(500).json({
      message: err.message
    });
  });
});
router.post("/login", function (req, res) {});
module.exports = router;