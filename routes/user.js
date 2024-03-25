const express=require("express");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");


const router=express.Router();    
const User=require("../models/user_model");

router.post("/register",async(req,res)=>{
    const newUSer=req.body;
    newUSer.password=await  bcrypt.hash(newUSer.password,10);
    const news= await User.create(newUSer);
    res.send(news);
});

router.post("/login",async(req,res)=>{
    const user=req.body;
    console.log(user.password);
    const dbUser=await User.findOne({email:user.email});
    const isPasswordCorrect= await  bcrypt.compare(user.password,dbUser.password);
    if(isPasswordCorrect){
        const token=  jwt.sign({role:dbUser.role,email:dbUser.email},process.env.JWT_SECRET)
        res.send(
            {
                message:"Successful login",
                data:{
                    token:token
                    }
            }
            );
    }else{
        res.status(401).send({message: "Invalid email or password"});
    }
    // const news=User.create(newUSer);
    // res.send(news);
});

module.exports=router;