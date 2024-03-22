"use strict";

var _require = require("./db"),
    connect = _require.connect,
    disconnect = _require.disconnect,
    saveUser = _require.saveUser,
    findUser = _require.findUser;

var User = require("../models/userModel");

var mongoose = require("mongoose");

jest.mock("./db"); // Describe function, test(), expect()

beforeAll(function _callee() {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(connect());

        case 2:
          return _context.abrupt("return", _context.sent);

        case 3:
        case "end":
          return _context.stop();
      }
    }
  });
});
describe("User Test Suite", function () {
  test("As a user I want to save a user to the database", function _callee2() {
    var newUser, user;
    return regeneratorRuntime.async(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            newUser = new User({
              _id: new mongoose.Types.ObjectId(),
              firstName: "Eric",
              lastName: "Clarke",
              address: "123 Main St",
              city: "Orlando",
              state: "FL",
              zipCode: "34256",
              email: "eric@eric.com",
              password: "123"
            });
            _context2.next = 3;
            return regeneratorRuntime.awrap(saveUser(newUser));

          case 3:
            user = _context2.sent;
            expect(user.firstName).toEqual("Eric");
            expect(user.lastName).toEqual("Clarke");
            expect(user.address).toEqual("123 Main St");
            expect(user.city).toEqual("Orlando");
            expect(user.state).toEqual("FL");
            expect(user.zipCode).toEqual("34256");
            expect(user.email).toEqual("eric@eric.com");
            expect(user.password).toEqual("123");

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    });
  });
  test("As a user I want to find a user by any propery", function _callee3() {
    var obj;
    return regeneratorRuntime.async(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            obj = {
              email: "eric@eric.com"
            };
            _context3.next = 3;
            return regeneratorRuntime.awrap(findUser(obj).then(function (user) {
              expect(user.firstName).toBe('Eric');
              expect(user.lastName).toBe('Clarke');
              expect(user.address).toEqual("123 Main St");
              expect(user.city).toEqual("Orlando");
              expect(user.state).toEqual("FL");
              expect(user.zipCode).toEqual("34256");
              expect(user.email).toEqual("eric@eric.com");
              expect(user.password).toEqual("123");
            }));

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    });
  });
});
afterAll(function _callee4() {
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(disconnect());

        case 2:
          return _context4.abrupt("return", _context4.sent);

        case 3:
        case "end":
          return _context4.stop();
      }
    }
  });
});