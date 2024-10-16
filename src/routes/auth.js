const express = require("express");
const {validateSignUpData} = require("../utils/validation.js");
const User = require("../models/user.js");
const bcrypt = require("bcrypt");
const { Db } = require("mongodb");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const{userAuth} = require("../middlewares/auth.js");

const authRouter = express.Router();

authRouter.post("/signup", async (req, res) => {
    try {
        // Validation step
        validateSignUpData(req); // Add 'await' if it's an async function
  
        const { firstName, lastName, emailId, password, age, gender } = req.body;
  
        // Additional email validation if needed
     
  
        // Encrypt the password
        const passwordHash = await bcrypt.hash(password, 10);
        console.log(passwordHash);
  
        // Creating a new instance of user model
        const user = new User({
            firstName,
            lastName,
            emailId,
            password:passwordHash,
        });// we can do this also but we want specifically that {firstName,lastName,emailId,pased,etc}
        runValidators: true;
        await user.save();
        return res.send("User added successfully");
    } catch (err) {
        return res.status(400).send("Error  " + err.message);
    }
  });


  authRouter.post("/login",async(req,res)=>{
    try{
        //coz we only need email and password for validation
        const{emailId,password} = req.body;
    const user = await User.findOne({emailId});
    if(!user){
        throw new Error ("EmailId id is not present in Database");
    }
     const isPasswordvalid = await bcrypt.compare(password,user.password);
     if(isPasswordvalid){
        //create JWT token
        const token = await jwt.sign({_id:user._id},"DEV@Tinder$790");
        console.log(token);
        //adding token to the cookie and sending back to the user
        res.cookie("token",token);
        res.send("login sucessfully");
     }
     else{
        throw new Error("Invalid credentials");
     }
     

    }catch(err){
        res.status(400).send("error: " +err.message);
    }

})





module.exports = authRouter;
