const express=require("express");
const jwt=require("jsonwebtoken");

const router=express.Router();
const Hotel=require("../models/hotel_model.js");


// const hotels=[
//     {
//         id:1,
//         name:"hotel1",
//         country:"india",
//         city:"Banglore",
//         price:100,
//         rooms:250,
//         available:10,
//         image:""
//     },
//     {
//         id:2,
//         name:"hotel2",
//         country:"india",
//         city:"Banglore",
//         price:100,
//         rooms:250,
//         available:10,
//         image:""
//     },
//     {
//         id:3,
//         name:"hotel3",
//         country:"india",
//         city:"Banglore",
//         price:100,
//         rooms:250,
//         available:10,
//         image:""
//     },{
//         id:4,
//         name:"hotel4",
//         country:"india",
//         city:"Banglore",
//         price:100,
//         rooms:250,
//         available:10,
//         image:""
//     },{
//         id:5,
//         name:"hotel5",
//         country:"india",
//         city:"Banglore",
//         price:100,
//         rooms:250,
//         available:10,
//         image:""
//     }

// ]

const jwtVerify=(req,res,next)=>{
    const headers=req.headers;
    const token=headers.authorization;
    if(!token){
       return  next();
    }
        const decodeToken=jwt.verify(token,process.env.JWT_SECRET);
        req.user=decodeToken;
        next();
    
}
router.use(jwtVerify);

router.get("/", async (req,res)=>  {
    if(req.user){
        const hotels= await Hotel.find();
        res.send(hotels);
    }else{
        res.status(401).send({message:"No TOken Found"});
    }
  
});

router.get("/:id", async (req,res)=>{
    const id=req.params.id
    const hotel=await Hotel.findById(id);
    res.send(hotel);
});

router.post('/',async (req,res)=>{
    if(req.user && req.user.role==="ADmin"){
        // console.log(req);
        const hotel=req.body;
        const dbHotel = await Hotel.create(hotel);
        res.send(dbHotel);
        // hotel.id=hotels.length+1;
        // hotels.push(hotel); 
        // res.send(hotels);
    }else{
        res.status(403).send({message:"Unauthorized User"});
    }
   

});

module.exports=router;