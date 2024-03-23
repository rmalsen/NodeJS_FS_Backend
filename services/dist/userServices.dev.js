"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _require = require('../db/db'),
    findUser = _require.findUser,
    saveUser = _require.saveUser;

var errorTemplate = require('../templates/errorTemplate');

var jwt = require('jsonwebtoken');

require('dotenv').config();

var bcrypt = require('bcrypt');

var User = require('../models/userModel');

var mongoose = require('mongoose');

exports.registerUser = function _callee(req, res) {
  var user, newUser, hash, savedUser;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(findUser({
            email: req.body.email
          }));

        case 3:
          user = _context.sent;

          if (!user) {
            _context.next = 8;
            break;
          }

          throw new Error("User exist, try loggin in");

        case 8:
          //    Initialize a new user model and assign request body to it
          // Create a new user
          newUser = new User(_objectSpread({
            _id: new mongoose.Types.ObjectId()
          }, req.body)); // encrypt the password

          _context.next = 11;
          return regeneratorRuntime.awrap(bcrypt.hash(newUser.password, 10));

        case 11:
          hash = _context.sent;
          // set the hashed password and save the new user
          newUser.password = hash;
          _context.next = 15;
          return regeneratorRuntime.awrap(saveUser(newUser));

        case 15:
          savedUser = _context.sent;
          return _context.abrupt("return", res.status(201).json({
            message: "Successful Registration",
            user: savedUser
          }));

        case 17:
          _context.next = 22;
          break;

        case 19:
          _context.prev = 19;
          _context.t0 = _context["catch"](0);
          return _context.abrupt("return", errorTemplate(res, _context.t0, _context.t0.message));

        case 22:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 19]]);
};

exports.loginUser = function _callee2(req, res) {
  var loggedUser, result, token;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap(findUser({
            email: req.body.email
          }));

        case 3:
          loggedUser = _context2.sent;

          if (loggedUser) {
            _context2.next = 8;
            break;
          }

          throw new Error("Authentication Failed: Unable to find user");

        case 8:
          _context2.next = 10;
          return regeneratorRuntime.awrap(bcrypt.compare(req.body.password, loggedUser.password));

        case 10:
          result = _context2.sent;

          if (!result) {
            _context2.next = 17;
            break;
          }

          loggedUser.password = null; // Create JSon web token // return message successful authentication // token // togged:true

          token = jwt.sign({
            user: loggedUser
          }, process.env.jwt_secret); // Return a response stating authentication succesfull.

          return _context2.abrupt("return", res.status(201).json({
            user: loggedUser,
            logged: true,
            token: token,
            message: "Login Successful"
          }));

        case 17:
          throw new Error("Authentication Failed: Email or password does not match");

        case 18:
          _context2.next = 23;
          break;

        case 20:
          _context2.prev = 20;
          _context2.t0 = _context2["catch"](0);
          return _context2.abrupt("return", errorTemplate(res, _context2.t0, _context2.t0.message));

        case 23:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 20]]);
};