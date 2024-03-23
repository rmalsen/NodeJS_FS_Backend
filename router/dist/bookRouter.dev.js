"use strict";

var express = require('express');

var router = express.Router(); // http://localhost:3001/users

router.get('/', function (req, res, next) {
  res.status(200).json({
    message: "successful -GET",
    metadata: {
      hostname: req.hostname,
      method: req.method
    }
  });
}); // http://localhost:3001/users/34

router.get('/:id', function (req, res, next) {
  res.status(200).json({
    message: "Successful - GET by ID",
    metadata: {
      id: req.params.id,
      hostname: req.hostname,
      method: req.method
    }
  });
}); // http://localhost:3001/users
// Successful POST is returned as a 201 code

router.post('/', function (req, res, next) {
  var name = req.body.name;
  res.status(201).json({
    message: "successful - POST",
    metadata: {
      name: name,
      hostname: req.hostname,
      method: req.method
    }
  });
}); // http://localhost:3001/users/34

router.put('/:id', function (req, res, next) {
  res.status(200).json({
    message: "Successful - PUT by ID",
    metadata: {
      id: req.params.id,
      hostname: req.hostname,
      method: req.method
    }
  });
}); // http://localhost:3001/users/34

router["delete"]('/:id', function (req, res, next) {
  res.status(200).json({
    message: "Successful - DELETE by ID",
    metadata: {
      id: req.params.id,
      hostname: req.hostname,
      method: req.method
    }
  });
});
module.exports = router;