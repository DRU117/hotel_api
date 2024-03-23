const express=require("express");

const app=express();
app.use(express.json());

const hotels=[
    {
        id:1,
        name:"hotel1",
        country:"india",
        city:"Banglore",
        price:100,
        rooms:250,
        available:10,
        image:""
    },
    {
        id:2,
        name:"hotel2",
        country:"india",
        city:"Banglore",
        price:100,
        rooms:250,
        available:10,
        image:""
    },
    {
        id:3,
        name:"hotel3",
        country:"india",
        city:"Banglore",
        price:100,
        rooms:250,
        available:10,
        image:""
    },{
        id:4,
        name:"hotel4",
        country:"india",
        city:"Banglore",
        price:100,
        rooms:250,
        available:10,
        image:""
    },{
        id:5,
        name:"hotel5",
        country:"india",
        city:"Banglore",
        price:100,
        rooms:250,
        available:10,
        image:""
    }

]

// create a path
app.get("/",(req,res)=>{
    console.log(req);
    res.send("Hello World ");
});

app.get("/api/hotels",(req,res)=>{
    res.send(hotels);
});

app.get("/api/hotels/:id",(req,res)=>{
    const id=req.params.id
    const hotel=hotels.find(hotel=> hotel.id === parseInt(id));
    res.send(hotel);
});

app.post('api/hotels',(req,res)=>{
    console.log(req);
    const hotel=req.body;
    hotel.id=hotels.length+1;
    hotels.add(hotel); 

    
    res.send(hotels);

});

// make server up on port 3000
app.listen(3000,(err)=>{
    if(err){
        console.log("error");
    }else{
        console.log("Server running on port 3000");
    }
})