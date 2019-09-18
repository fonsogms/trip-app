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
    itinerary.push({day:i,monuments:[],museums:[],restaurants:[]})
  }
  console.log(itinerary)
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
    let hotelCoordinates=[ordered[0].coordinates.latitude,ordered[0].coordinates.longitude];
    
    const searchMonuments={
    sort: "rating",
    categories: "landmarks",
    latitude:hotelCoordinates[0],
    longitude:hotelCoordinates[1],
    radius:3000,
  }
    client.search(searchMonuments).then(data=>{
      const secondResult = data.jsonBody.businesses.slice(0,20);
      let orderedMon=secondResult.sort(function(a, b) {
      return parseFloat(b.review_count)-parseFloat(a.review_count);
       });
       let numbers=[0,1,2,3,4,5,6,7,8];

       let c=0;
      for(let i=0; i<itinerary.length ; i +=1){
          itinerary[i].monuments.push(orderedMon[c]);
          itinerary[i].monuments.push(orderedMon[c+1]);
          c+=2
      }


         
       
       console.log(itinerary[0].monuments,itinerary[1].monuments, itinerary[2].monuments,);
      //console.log(secondResult)
      const searchMuseums={
        sort: "rating",
        categories: "museums",
        latitude:hotelCoordinates[0],
        longitude:hotelCoordinates[1],
        radius:3000,}
      client.search(searchMuseums).then(data=>{
        const thirdResult = data.jsonBody.businesses;
        let orderedMus=thirdResult.sort(function(a, b) {
        return parseFloat(b.review_count)-parseFloat(a.review_count);
         });
         let d=0;
         for(let i=0; i<itinerary.length ; i +=1){
          itinerary[i].museums.push(orderedMus[d]);
          itinerary[i].museums.push(orderedMus[d+1]);
          d+=2
          }

       //  console.log(thirdResult)
        const searchRestaurants={
          sort: "rating",
          categories: "restaurants",
          latitude:hotelCoordinates[0],
          longitude:hotelCoordinates[1],
          radius:3000,}
        
        client.search(searchRestaurants).then(data=>{
          const fourthResult = data.jsonBody.businesses;

          let orderedRes=fourthResult.sort(function(a, b) {
          return parseFloat(b.review_count)-parseFloat(a.review_count);
          });
          let e=0;
          for(let i=0; i<itinerary.length ; i +=1){
            itinerary[i].restaurants.push(orderedRes[e]);
            itinerary[i].restaurants.push(orderedRes[e+1]);
            itinerary[i].restaurants.push(orderedRes[e+2]);

            e+=3
            }
            console.log(itinerary[0].restaurants[0]);
            res.render("result.hbs",{city:city, ordered:ordered[0],itinerary:itinerary});
            return;
        //  console.log(fourthResult)

        })
        .catch(err=>{
          console.log(err);
        })
      }).catch(err=>{
        console.log(err)
      }) 
    }).catch(err=>{
      console.log(err)
    })


    // const prettyJson = JSON.stringify(ordered[0], null, 4);
    // console.log("Empieza aqui",prettyJson);


    console.log("acaba aqui")
    
  }).catch(e => {
    console.log(e);
  });
  // The places to go based on the hotel coordinates 
  
    
    //yelp api search request based on hotel coordinates 
    
  
});

module.exports = router;
