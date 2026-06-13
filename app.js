const express = require("express");
const path = require("path");
const mongoose = require("mongoose");

const app = express();


// ================= MIDDLEWARE =================

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(express.static(path.join(__dirname,"public")));


// ================= EJS =================

app.set("views",path.join(__dirname,"view"));
app.set("view engine","ejs");


// ================= MongoDB =================

mongoose.connect("mongodb://127.0.0.1:27017/monkey")
.then(()=>{
    console.log("✅ MongoDB Connected");
})
.catch(err=>{
    console.log(err);
});


// ================= Schema =================

const deviceSchema = new mongoose.Schema({

    LAT:Number,
    LON:Number,

    X:Number,
    Y:Number,
    Z:Number,

    time:{
        type:Date,
        default:Date.now
    }

});


const Device = mongoose.model(
    "device",
    deviceSchema
);


// ================= CONTACT ARRAY =================

let contacts=[];


// ================= HOME =================


app.get("/",(req,res)=>{

    res.render("home");

});



// ================= DASHBOARD =================


app.get("/dashboard",async(req,res)=>{


    let data = await Device
    .findOne()
    .sort({time:-1});


    res.render("dashboard",{

        data:data

    });


});



// ================= API LIVE DATA =================


app.get("/api/esp",async(req,res)=>{


    let data = await Device
    .findOne()
    .sort({time:-1});


    res.json(data);


});




// ================= GPS PAGE =================


app.get("/gps",async(req,res)=>{


    let data = await Device
    .findOne()
    .sort({time:-1});



    res.render("gps",{

        data:data

    });


});




// ================= LOCATION =================


app.get("/location",async(req,res)=>{


    let data = await Device
    .findOne()
    .sort({time:-1});


    res.render("location",{

        data:data

    });


});




// ================= BATTERY =================


app.get("/battery",(req,res)=>{

    res.render("battery");

});



// ================= CONTACT =================


app.get("/contact",(req,res)=>{


    res.render("contact",{

        contacts:contacts

    });


});



// ================= ADD CONTACT =================


app.post("/add-contact",(req,res)=>{


    contacts.push({

        name:req.body.name,

        phone:req.body.phone,

        relation:req.body.relation

    });


    console.log(
        "🚨 Contact Added",
        contacts
    );


    res.redirect("/contact");


});




// ================= SERVER =================


app.listen(3000,()=>{

    console.log(
    "🚀 Server running http://localhost:3000"
    );

});