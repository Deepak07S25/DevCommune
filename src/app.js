const express = require("express");

const connectDB = require("./config/database.js");
const app = express(); 
const User = require("./models/user.js");

app.use(express.json());

// app.post("/signup",async(req,res) =>{
//     const user = new user
// });
//get user by email
app.get("/user", async(req,res) =>{
    const userEmail = req.body.emailId;
    try{
        const user = await User.find({emailId: userEmail});
        //adding condition to handle empty case
        if(user.length === 0){
          res.status(404).send("user not found");
        }
       else {res.send(user);}

    }
    catch(err){
        res.status(400).send("Something sent wrong");
    }
});


// to get the all data from the databse
app.get("/feed",async(req,res) => {
  try{
    const userss = await User.find({});
    res.send(userss);
  }
  catch(err){
    res.status(400).send("something wwnt wrong");
  }
});
// got all the data 






// app.post("/signup",async(req,res) =>{
//      //creating a new instance of the User model
//         const user = new User(req.body);

//         try{
//             await user.save();
//             res.send("user added successfully");
//         } catch (err) {
//             res.status(400).send("Error saving the user:" + err.message)
//         }


     //      console.log(req.body);
//      const user = new User({
//          firstName:"Pawan",
//         lastName:"Singh",
//          emailId:"akshay@xyz.com",
//         password:"Deepak4dev"
//     });
//    await user.save();
//    res.send("user Added successfully");


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

