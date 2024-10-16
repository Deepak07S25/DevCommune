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

app.post("/login",async(req,res)=>{
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
        const token = await jwt.sign({_id:user_id},"DEV@Tinder$790");
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



// //------------debugging-----------
// app.post("/login", async (req, res) => {
//     try {
//         const { emailId, password } = req.body;

//         console.log("Login attempt with emailId:", emailId); // Log the attempted emailId

//         if (!emailId || !password) {
//             throw new Error("EmailId and password are required");
//         }

//         const user = await User.findOne({ emailId });
//         if (!user) {
//             console.log("User not found in the database"); // Log for debugging
//             throw new Error("EmailId is not present in Database");
//         }

//         const isPasswordValid = await bcrypt.compare(password, user.password);
//         if (isPasswordValid) {
//             res.send("Login successfully");
//         } else {
//             throw new Error("Invalid credentials");
//         }
//     } catch (err) {
//         res.status(400).send("Error: " + err.message);
//     }
// });

// connectDB()
//    .then(() => {
//     console.log("Database connection established....");
//     app.listen(3000 ,() =>{
//     console.log("Server is successfully listening on port 3000...");
//  } );   
//    })
//    .catch((err) => {
//     console.error("Database cannot be connected");
//    }) 
