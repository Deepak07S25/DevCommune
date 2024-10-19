const mongoose = require("mongoose");

const connectionRequestSchema = new mongoose.Schema({
    fromUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, // Ensures that fromUserId is always provided
        ref: 'User' // Reference to the User model
    },
    toUserId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true, // Ensures that toUserId is always provided
        ref: 'User' // Reference to the User model
    },
    status: {
        type: String,
        required:true,
        enum: {
            values: ["ignore", "interested", "accepted", "rejected"],
            message: `{VALUE} is not a valid status type` // Corrected message
        },
        required: true // Ensures that status is always provided
    },
}, 
{ timestamps: true }); // Closing parenthesis for the schema definition

// Pre-save middleware to check if fromUserId is the same as toUserId
connectionRequestSchema.pre("save", function(next) {
    const connectionRequest = this;
    // Check if the fromUserId is the same as toUserId
    if (connectionRequest.fromUserId.equals(connectionRequest.toUserId)) {
      throw new Error("Cannot send a connection request to yourself");
    }
    next(); // Call next() if no error
});

const ConnectionRequestModel = new mongoose.model(
    "ConnectionRequest",connectionRequestSchema
);
module.exports = ConnectionRequestModel;
