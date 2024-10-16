const express = require("express");

const profileRouter = express.Router();
const{userAuth} = require("../middlewares/auth.js");


profileRouter.get("/profile", userAuth,async(req,res) =>{
    //using try block
    try{
      const user = req.user;
    //     const cookies = req.cookies;
    //     const {token} = cookies;
    //     if(!token){
    //         throw new Error("Invalid Token");
    //     }
    // const decodedMessages = await jwt.verify(token,"DEV@Tinder$790");
    // const {_id} = decodedMessages;
  
    // const user = await User.findById(_id);
    // if(!user){
    //     throw new Error("User does Not exists");
    // }
    res.send(user);
  
    }catch(err){
        res.status(400).send("Error : ",+ err.message);
    }
  })



  module.exports = profileRouter;