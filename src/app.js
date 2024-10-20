const express = require("express");
const connectDB = require("./config/database.js");
const app = express();
const User = require("./models/user.js");
const cookieParser = require("cookie-parser");


const { userAuth } = require("./middlewares/auth.js");

app.use(cookieParser());
app.use(express.json());

const authRouter = require("./routes/auth.js");
const profileRouter = require("./routes/profile.js");
const requestRouter = require("./routes/request.js");
const userRouter = require("./routes/user.js");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/",userRouter);

connectDB()
   .then(() => {
      console.log("Database connection established....");
      app.listen(3000, () => {
         console.log("Server is successfully listening on port 3000...");
      });
   })
   .catch((err) => {
      console.error("Database cannot be connected", err);
   });
