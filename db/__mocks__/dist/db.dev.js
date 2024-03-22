"use strict";

var connect = function connect() {
  return regeneratorRuntime.async(function connect$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log('MongoDB mocked connection.');

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
};

var disconnect = function disconnect() {
  return regeneratorRuntime.async(function disconnect$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          console.log('Mocked disconnect');

        case 1:
        case "end":
          return _context2.stop();
      }
    }
  });
}; // obj {email: req.body.email}


var findUser = function findUser(obj) {
  return regeneratorRuntime.async(function findUser$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          return _context3.abrupt("return", Promise.resolve({
            firstName: "Eric",
            lastName: "Clarke",
            address: "123 Main St",
            city: "Orlando",
            state: "FL",
            zipCode: "34256",
            email: "eric@eric.com",
            password: "123"
          }));

        case 1:
        case "end":
          return _context3.stop();
      }
    }
  });
};

var saveUser = function saveUser(newUser) {
  return regeneratorRuntime.async(function saveUser$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          return _context4.abrupt("return", Promise.resolve({
            firstName: "Eric",
            lastName: "Clarke",
            address: "123 Main St",
            city: "Orlando",
            state: "FL",
            zipCode: "34256",
            email: "eric@eric.com",
            password: "123"
          }));

        case 1:
        case "end":
          return _context4.stop();
      }
    }
  });
};

module.exports = {
  connect: connect,
  disconnect: disconnect,
  findUser: findUser,
  saveUser: saveUser
};