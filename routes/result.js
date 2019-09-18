//setup for the project
const express = require("express");
const router = express.Router();
//Amadeus api setup
const Amadeus = require('amadeus');
var amadeus = new Amadeus({
  clientId: 'zOEKFP0AAfN78XN6tbqMDZE2DA3VbuoT',
  clientSecret: 'ymwDkjLZzeXuRLeA'
});
// Axios setup
const axios=require("axios");

//YELP API SETUP
const yelp=require("yelp-fusion");
const apiKey = 'I3MQ56BQ3r0ixQf-BawisZbcp25tfJcvdqIaful1PxX2MNLAOeSZfghR4XyHvKfixnmwaSB6IEuna0bNecNU0L9oZkmjm91xAJy2ZECDnhS_eGU6LxsNKxg-lxiBXXYx';
const client = yelp.client(apiKey);





router.get("/", (req, res) => {
 //here we get the input of the user (city and days)
  let city= req.query.city;
  let days= req.query.days;
  let itinerary=[];
  for (let i=1;i<=days;i++){
   itinerary.push(i);
  }
  console.log(city, days)
  
  //Get hotels based on a city!!
  const searchHotel = {
    sort: "rating",
    categories: "hotels",
    location:city,
  };
  client.search(searchHotel).then(response => {
    const firstResult = response.jsonBody.businesses.slice(0,4);
    let ordered=firstResult.sort(function(a, b) {
      return parseFloat(b.review_count)-parseFloat(a.review_count);
  });
    const prettyJson = JSON.stringify(ordered, null, 4);
    
    //console.log("Empieza aqui",prettyJson);
    console.log("acaba aqui")
    res.render("result.hbs",{city:city, ordered:ordered[0]});
  }).catch(e => {
    console.log(e);
  });
  // The places to go based on the hotel coordinates 
  
    
    //yelp api search request based on hotel coordinates 
    
  
});

module.exports = router;
