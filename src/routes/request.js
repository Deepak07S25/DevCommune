const express = require("express");

const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth.js");

requestRouter.post("/sendConnectionRequest", userAuth, async (req, res) => {
    try {
        const user = req.user;
        // Check if user exists in req (just as a precaution)
        if (!user) {
            throw new Error("User not authenticated");
        }

        // Sending a connection request
        console.log("Sending a connection request");

        res.send(`${user.firstName} sent the connection request!`);
    } catch (err) {
        res.status(400).send(`Error: ${err.message}`);
    }
});

module.exports = requestRouter;
