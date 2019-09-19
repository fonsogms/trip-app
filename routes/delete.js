// //setup for the project
const express = require("express");
const router = express.Router();


// //requiring models
 const User = require("../models/User");
 const Itinerary=require("../models/itinerary")
// //Mongoose setup
 const mongoose = require("mongoose");
router.get("/delete",(req,res)=>{
Itinerary.findByIdAndDelete(req.user.itinerary._id).then(()=>{
  User.findByIdAndUpdate(req.user._id, {itinerary:undefined}).then(()=>{
    res.redirect("/search")
  })
})

                        
})
module.export=router;