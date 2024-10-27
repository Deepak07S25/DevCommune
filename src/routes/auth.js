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
        validateSignUpData(req);
  
        const { firstName, lastName, emailId, password, age, gender, about, skills ,photoUrl } = req.body;

        // Encrypt the password
        const passwordHash = await bcrypt.hash(password, 10);

        // Creating a new instance of user model
        const user = new User({
            firstName,
            lastName,
            emailId,
            password: passwordHash,
            age,
            gender,
            about,  // Make sure these fields are included
            skills,
            photoUrl, // Make sure these fields are included
        });

        await user.save();
        return res.send("User added successfully");
    } catch (err) {
        return res.status(400).send("Error: " + err.message);
    }
});

authRouter.post("/login", async (req, res) => {
    try {
      const { emailId, password } = req.body;
  
      // Check if the user exists
      const user = await User.findOne({ emailId });
      if (!user) {
        throw new Error("Email not found in the database.");
      }
  
      // Validate password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        throw new Error("Invalid credentials.");
      }
  
      // Create JWT token
      const token = await jwt.sign({ _id: user._id }, process.env.JWT_SECRET || "DEV@Tinder$790", {
        expiresIn: "1h", // Token expiry
      });
  
      // Adding token to the cookie and sending back to the user
      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production", // Ensures cookie is secure in production
        maxAge: 3600000, // 1 hour
      });
      res.send({ message: "Login successful", user });
    } catch (err) {
      res.status(400).send("Error: " + err.message);
    }
  });


authRouter.post("/logout", async (req, res) => {
    res.cookie("token", null, { expires: new Date(Date.now() - 1000) });
    res.send("Logout successful");
});




module.exports = authRouter;
