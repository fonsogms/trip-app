// //setup for the project
const express = require("express");
const router = express.Router();


// //requiring models
 const User = require("../models/User");
const Itinerary=require("../models/Itinerary")
// //Mongoose setup
// const mongoose = require("mongoose");

 router.get("/",(req,res)=>{

    const userName=req.user;
  /*   User.findById(req.user._id)
    .populate("itinerary")
    .then(foundUser=>{
      console.log("------",foundUser) */
      res.render("userResult",{iti:req.user.itinerary});
 /*    })
    .catch(err=>console.log("No Iti there",err)) */
 })

 router.get("/delete",(req,res)=>{
  Itinerary.findByIdAndDelete(req.user.itinerary._id).then(()=>{
    User.findByIdAndUpdate(req.user._id, {itinerary:undefined}).then(()=>{
      res.redirect("/search")
    })
  })
})
 module.exports=router;