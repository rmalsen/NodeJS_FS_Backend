const {findUser, saveUser} = require('../db/db');
const errorTemplate = require('../templates/errorTemplate');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const bcrypt = require('bcrypt');
const User = require('../models/userModel')
const mongoose = require('mongoose');

exports.registerUser = async (req, res) => {
   try{
    const user = await findUser({ email: req.body.email })
    
      if (user) {
        // Throw error
       throw new Error("User exist, try loggin in");
      } else {
        //    Initialize a new user model and assign request body to it
        // Create a new user
        const newUser = new User({
          _id: new mongoose.Types.ObjectId(),
          ...req.body,
        });

        // encrypt the password
        const hash = await bcrypt.hash(newUser.password, 10);
            // set the hashed password and save the new user
            newUser.password = hash;
            const savedUser = await saveUser(newUser)
                // User saved successfully
                return res
                  .status(201)
                  .json({ message: "Successful Registration", user: savedUser });      
    }
   }catch(e){
    return errorTemplate(res, e, e.message)
   }
};

exports.loginUser = async (req, res) => {
  try {
    const loggedUser = await findUser({ email: req.body.email });

    if (!loggedUser) {
      throw new Error("Authentication Failed: Unable to find user");
    } else {
        const result = await bcrypt.compare(req.body.password, loggedUser.password);

        if(result){
            loggedUser.password = null;
            // Create JSon web token // return message successful authentication // token // togged:true
            const token = jwt.sign({user: loggedUser}, process.env.jwt_secret);
            // Return a response stating authentication succesfull.
            return res.status(201).json({
                user: loggedUser,
                logged: true,
                token: token,
                message: "Login Successful"
            })
        }else{
            // Return response failed
            throw new Error("Authentication Failed: Email or password does not match")
        }
    }
  } catch (e) {
    return errorTemplate(res, e, e.message);
  }
};
