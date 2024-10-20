const express = require("express");
const userRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");

const USER_SAFE_DATA = "firstName lastName age gender about skills";

userRouter.get("/user/requests/received", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            toUserId: loggedInUser._id,
            status: "interested",
        })
          .populate("fromUserId",USER_SAFE_DATA)
          .populate("toUserId",USER_SAFE_DATA);//can use .select with this to reject the values we do not want to show
       
        const data = connectionRequests.map((row) =>{
             if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
                return row.toUserId;
             }
             return row.fromUserId;
        });

        res.status(200).json({
            message: "Data fetched successfully",
            data: connectionRequests,
        });

    } catch (err) {
        res.status(400).json({ message: "Error: " + err.message });
    }
});


// api to see all the user's connections
userRouter.get("/user/connections",userAuth, async(req,res)=>{
    
    try{
        const loggedInUser = req.user;
        const connectionRequests = await ConnectionRequest.find({
            $or:[
                {toUserId: loggedInUser._id,status:"accepted"},
                {fromUserId: loggedInUser._id,status:"accepted"},
            ],
        }).populate("fromUserId",USER_SAFE_DATA)

        const data = connectionRequests.map((row)=>row.fromUserId);
        res.json({data});

    }catch(err){
        res.status(400).send({message: err.message});
    }


});

userRouter.get("/feed", userAuth, async (req, res) => {
    try {
        const loggedInUser = req.user;
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page - 1) * limit;

        const connectionRequests = await ConnectionRequest.find({
            $or: [{ fromUserId: loggedInUser._id }, { toUserId: loggedInUser._id }],
        }).select("fromUserId toUserId");

        // Initialize a new Set 
        const hideUserFromFeed = new Set();
        connectionRequests.forEach((req) => {
            hideUserFromFeed.add(req.fromUserId.toString());
            hideUserFromFeed.add(req.toUserId.toString());
        });

        const users = await User.find({
            $and: [
                { _id: { $nin: Array.from(hideUserFromFeed) } },
                { _id: { $ne: loggedInUser._id } },
            ],
        })
            .select(USER_SAFE_DATA)
            .skip(skip)
            .limit(limit);

        res.send(users);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


module.exports = userRouter;
