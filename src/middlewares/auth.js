const jwt = require("jsonwebtoken");  
const User = require("../models/user");
  
  
  const userAuth = async(req,res,next) =>{
   //1.Read the token from the req cookies
      //2.Validate the token
   //3.find the username 
    //const cookies = req.cookies;
 try{   const{token} = req.cookies;

    const decodedObj = await jwt.verify(token,"DEV@Tinder$790");
    const {_id} = decodedObj;


   const user = await User.findById(_id);
   if(!user){
    throw new Error("User not found");
   }
   req.user = user;
   next();}
   catch(err){
    res.status(400).send("Error : " + err.message);
   }

  
  };








module.exports = {
    
    userAuth,
}