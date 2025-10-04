const express = require("express");
const connectDB = require("./config/database.js");
const app = express(); 
const User = require("./models/user.js");
const bcrypt = require("bcrypt");
const validator = require("validator");
const {validateSignUpData} = require("./utils/validation.js");


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
