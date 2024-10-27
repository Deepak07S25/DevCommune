const jwt = require("jsonwebtoken");  
const User = require("../models/user");
  
const userAuth = async (req, res, next) => {
    try {
        // 1. Read the token from the request cookies
        const { token } = req.cookies;

        // If no token is present, respond with an error
        if (!token) {
            return res.status(401).send("Please Login");
        }

        // 2. Validate the token
        const decodedObj = jwt.verify(token, "DEV@Tinder$790"); // No need for await here
        const { _id } = decodedObj;

        // 3. Find the user based on the decoded token's user ID
        const user = await User.findById(_id);
        if (!user) {
            throw new Error("User not found");
        }

        // Set the user on the request object
        req.user = user;
        next();
    } catch (err) {
        // Return a 401 status for any authentication-related errors
        res.status(401).send("Error: " + err.message);
    }
};

module.exports = {
    userAuth,
};
