const express = require("express");
const connectDB = require("./config/database.js");
const app = express(); 
const User = require("./models/user.js");
const bcrypt = require("bcrypt");
const validator = require("validator");
const {validateSignUpData} = require("./utils/validation.js");
const { Db } = require("mongodb");
const cookieparser = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(express.json());


app.get("/profile",async(req,res) =>{
    //using try block
    try{
        const cookies = req.cookies;
        const {token} = cookies;
        if(!token){
            throw new Error("Invalid Token");
        }
    const decodedMessages = await jwt.verify(token,"DEV@Tinder$790");
    const {_id} = decodedMessages;

    const user = await User.findById(_id);
    if(!user){
        throw new Error("User does Not exists");
    }
    res.send(user);

    }catch(err){
        res.status(400).send("Error : ",+ err.message);
    }
})

connectDB()
   .then(() => {
    console.log("Database connection established....");
    app.listen(3000 ,() =>{
    console.log("Server is successfully listening on port 3000...");
 } );   
   })
   .catch((err) => {
    console.error("Database cannot be connected");
   }) 
