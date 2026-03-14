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

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
console.log("Server running on port " + PORT);
});