const express = require("express");
const connectDB = require("./config/database.js");
const app = express(); 
const User = require("./models/user.js");
const bcrypt = require("bcrypt");
const validator = require("validator");
const {validateSignUpData} = require("./utils/validation.js");
const { Db } = require("mongodb");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const{userAuth} = require("./middlewares/auth.js");

app.use(cookieParser());

app.use(express.json());



// POST API for signup
app.post("/signup", async (req, res) => {
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



app.get("/profile", userAuth,async(req,res) =>{
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

// app.post("/signup",async(req,res) =>{
//     const user = new user
// });
//get user by email
// app.get("/user", async(req,res) =>{
//     const userEmail = req.body.emailId;
//     try{
//         const user = await User.find({emailId: userEmail});
//         //adding condition to handle empty case
//         if(user.length === 0){
//           res.status(404).send("user not found");
//         }
//        else {res.send(user);}

//     }
//     catch(err){
//         res.status(400).send("Something sent wrong");
//     }
// });


// to get the all data from the databse
// app.get("/feed",async(req,res) => {
//   try{
//     const userss = await User.find({});
//     res.send(userss);
//   }
//   catch(err){
//     res.status(400).send("something wwnt wrong");
//   }
// });
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

