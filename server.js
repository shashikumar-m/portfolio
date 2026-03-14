require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// serve frontend
app.use(express.static("public"));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI)
.then(()=>console.log("MongoDB connected"))
.catch(err=>console.log("MongoDB error:",err));

const VisitorSchema = new mongoose.Schema({
name:String,
email:String,
date:String,
time:String
});

const Visitor = mongoose.model("Visitor", VisitorSchema);

app.post("/visitor", async (req,res)=>{
try{
const v = new Visitor(req.body);
await v.save();
res.json({message:"saved"});
}
catch(err){
res.status(500).json({error:"Error saving visitor"});
}
});

app.get("/visitors", async (req,res)=>{
try{
const visitors = await Visitor.find().sort({_id:-1});
res.json(visitors);
}
catch(err){
res.status(500).json({error:"Error fetching visitors"});
}
});


app.delete("/clear-visitors", async (req,res)=>{
await Visitor.deleteMany({});
res.json({message:"All visitors deleted"});
});

function showPage(name){

if(name==="visitors"){
let pass = prompt("Admin password:");
if(pass!=="admin123"){
alert("Access denied");
return;
}
}

document.querySelectorAll('.page').forEach(p=>p.classList.remove('active'));
document.getElementById('page-'+name).classList.add('active');

window.scrollTo({top:0,behavior:'smooth'});

if(name==='visitors') renderVisitorTable();
}

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
console.log("Server running on port " + PORT);
});