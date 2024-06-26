require("dotenv").config();
const mongoose = require("mongoose");
const User = require('../models/userModel');



const connect = async () => {
    console.log('MongoDB is up and running.')
  await mongoose.connect(process.env.mongo);
};

const disconnect = async () => {
  await mongoose.connection.close();
};

// obj {email: req.body.email}
const findUser = async (obj) => {
   return User.findOne(obj).exec()
};

const saveUser = async (newUser) => {
  return await newUser.save();
};

module.exports = { connect, disconnect, findUser, saveUser };
