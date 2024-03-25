require("dotenv").config();

const express=require("express");
const app=express();

const mongoose = require('mongoose');

app.use(express.json());


const hotelRouter=require("./routes/hotel.js");
const userRouter=require("./routes/user.js");


//logger
const logger=(req,res,next)=>{
    console.log(`${req.method} recieved on ${req.url}`)
    next();
}
app.use(logger);

//routes
app.use("/api/hotels", hotelRouter);
app.use("/api/users",userRouter);


//db connection
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log("mongo db connected");
});


// create a path
app.get("/",(req,res)=>{
    console.log(req);
    res.send("Hotel World");
});



// make server up on port 3000
app.listen(3000,(err)=>{
    if(err){
        console.log("error");
    }else{
        console.log("Server running on port 3000");
    }
})