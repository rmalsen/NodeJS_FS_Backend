"use strict";

var express = require("express");

var router = express.Router();

var _require = require('../services/userServices'),
    loginUser = _require.loginUser,
    registerUser = _require.registerUser;

router.post("/register", registerUser);
router.post("/login", loginUser);
module.exports = router;