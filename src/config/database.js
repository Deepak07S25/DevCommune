const mongoose = require("mongoose");

const connectDB = async () =>{
await mongoose.connect(
    "mongodb+srv://Deep_07:Qfr7F7PRbag5Xjir@initail2.3w6hl.mongodb.net/myDatabase?retryWrites=true&w=majority "
);
};
// exporting the database connection
module.exports = connectDB;

