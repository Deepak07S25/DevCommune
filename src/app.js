const express = require("express");

const connectDB = require("./config/database.js");
const app = express(); 
const User = require("./models/user.js");

app.post("/signup",async(req,res) =>{
     //creating a new instance of the User model
    const user = new User({
        firstName:"Deepak",
        lastName:"Singh",
        emailId:"akshay@xyz.com",
        password:"Deepak4dev"
    });
  await user.save();
  res.send("user Added successfully");
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

// app.get("/user",(req, res) => {
//      console.log(req.query);
//     res.send({firstName:"Deepak",lastName: "Singh"});
//  });


// // app.post("/user",(req,res) =>{
// //     res.send("data successfully saved to database!");
// //  });

// // app.delete("/user",(req,res) =>{
// //     res.send("Deleted successfully");
// // });
 

// // app.use("/hello",(req,res) =>{
// //     res.send("i am the monkey king");
// //  });

