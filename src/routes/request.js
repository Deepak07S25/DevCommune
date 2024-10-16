const express = require("express");

const requestRouter = express.Router();
const{userAuth} = require("../middlewares/auth.js");

requestRouter.post("/sendConnectionRequest",userAuth, async (req,res) =>{
    const user = req.user;
    //sending a connection request
    console.log("sending a connection request");

    res.send(user.firstName + "send the connect request!");

});

module.exports = requestRouter;