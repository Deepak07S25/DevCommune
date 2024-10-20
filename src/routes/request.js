const express = require("express");
const ConnectionRequest = require("../models/connectionRequest.js");
const User = require("../models/user.js");

const requestRouter = express.Router();
const { userAuth } = require("../middlewares/auth.js");

requestRouter.post("/request/send/:status/:toUserId", userAuth, async (req, res) => {
    try {
        const fromUserId = req.user._id; // Get the ID of the logged-in user
        const toUserId = req.params.toUserId; // Get the ID of the user to whom the request is sent
        const status = req.params.status; // Get the status from the URL parameters

        const allowedStatus = ["ignored", "interested"]; // Define allowed status types

        // Check if the provided status is valid
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({ message: "Invalid status type: " + status });
        }

        // Check whether the recipient user exists in the database
        const toUser = await User.findById(toUserId);
        if (!toUser) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check for existing connection request
        const existingConnectionRequest = await ConnectionRequest.findOne({
            $or: [
                { fromUserId, toUserId },
                { fromUserId: toUserId, toUserId: fromUserId },
            ],
        });

        // If a connection request already exists, return an error
        if (existingConnectionRequest) {
            return res.status(400).json({ message: "Connection request already exists" });
        }

        // Create a new connection request
        const connectionRequest = new ConnectionRequest({
            fromUserId,
            toUserId,
            status,
        });

        // Save the connection request to the database
        const data = await connectionRequest.save();
        console.log("Connection request saved successfully:", data); // Log the successful save

        // Respond with a success message
        res.json({
            message: `${req.user.firstName} is ${status} in ${toUser.firstName}`,
            data,
        });

    } catch (err) {
        res.status(400).send(`Error: ${err.message}`);
    }
});


requestRouter.post("/request/review/:status/:requestId",userAuth, async(req,res) =>{
    try{ 
        const loggedInUser = req.user;
        const {status,requestId} = req.params;
        
    // checking the status
        const allowedStatus = ["accepted","rejected"];
        if(!allowedStatus.includes(status)){
            return res.status(400).json({message:"status not valid"});
        }
    //checking for the unique id
    const connectionRequest = await ConnectionRequest.findOne({
        _id : requestId,
        toUserId: loggedInUser._id,
        status:"interested",
    });
    //if not found reject
        if(!connectionRequest){
            return res.status(404).json({message:"Connection Request not found"});
        }

        //saving the request
        connectionRequest.status = status;
        const data = await connectionRequest.save();
        res.json({message:"Connection request  :"+ status ,data});

        
    }catch(err){
        res.status(400).send("Error :" + err.message);
    }


});




module.exports = requestRouter;