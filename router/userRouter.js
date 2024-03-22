const express = require("express");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const router = express.Router();
const mongoose = require("mongoose");
const { connect, disconnect, findUser, saveUser } = require("../db/db.js");

router.post("/register", (req, res, next) => {
  findUser({ email: req.body.email })
    .then((user) => {
      if (user) {
        // User already exists
        return res.status(409).json({
          message: "User exist, try loggin in",
        });
      } else {
        //    Initialize a new user model and assign request body to it
        // Create a new user
        const newUser = new User({
          _id: new mongoose.Types.ObjectId(),
          ...req.body,
        });

        // encrypt the password
        bcrypt.hash(newUser.password, 10, (err, hash) => {
          if (err) {
            // Error handling the password
            return res.status(500).json({ message: "Error " + err.message });
          } else {
            // set the hashed password and save the new user
            newUser.password = hash;
            saveUser(newUser)
              .then((dbUser) => {
                // User saved successfully
                return res
                  .status(201)
                  .json({ message: "Successful Registration", user: dbUser });
              })
              .catch((err) => {
                return res.status(500).json({ message: err.message });
              });
          }
        });
      }
    })
    .catch((err) => {
      return res.status(500).json({ message: err.message });
    });
});

router.post("/login", (req, res) => {});

module.exports = router;
