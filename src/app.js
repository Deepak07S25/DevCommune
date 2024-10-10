const express = require("express");

const app = express();

app.get("/user",(req, res) => {
    res.send({firstName:"Deepak",lastName: "Singh"});
 });

app.post("/user",(req,res) =>{
    res.send("data successfully saved to database!");
 });

app.delete("/user",(req,res) =>{
    res.send("Deleted successfully");
});
 

app.use("/hello",(req,res) =>{
    res.send("i am the monkey king");
 });


app.listen(3000 ,() =>{
    console.log("Server is successfully listening on port 3000...");
 } );   