//setup for the project
const express = require("express");
const router = express.Router();

//requiring models
// const User = require("../models/User");
const Itinerary=require("../models/Itinerary")
//Mongoose setup
 const mongoose = require("mongoose");
const User=require("../models/User")
//Amadeus api setup
const Amadeus = require("amadeus");
var amadeus = new Amadeus({
  clientId: "zOEKFP0AAfN78XN6tbqMDZE2DA3VbuoT",
  clientSecret: "ymwDkjLZzeXuRLeA"
});
// Axios setup
const axios = require("axios");
//YELP API SETUP
const yelp = require("yelp-fusion");
const apiKey =
  "I3MQ56BQ3r0ixQf-BawisZbcp25tfJcvdqIaful1PxX2MNLAOeSZfghR4XyHvKfixnmwaSB6IEuna0bNecNU0L9oZkmjm91xAJy2ZECDnhS_eGU6LxsNKxg-lxiBXXYx";
const client = yelp.client(apiKey);
router.get("/", (req, res) => {
  //here we get the input of the user (city and days)
  let username=req.user;
  console.log(username)
  let city = req.query.city;
  let days = req.query.days;
  let itinerary = [];
  for (let i = 1; i <= days; i++) {
    itinerary.push({ day: i, monuments: [], museums: [], restaurants: [] });
  }
  // console.log(itinerary);
  // console.log(city, days);
  //Get hotels based on a city!!
  const searchHotel = {
    sort: "rating",
    categories: "hotels",
    location: city
  };
  client
    .search(searchHotel)
    .then(response => {
      const firstResult = response.jsonBody.businesses.slice(0,6);
      let ordered = firstResult.sort(function(a, b) {
        return parseFloat(b.review_count) - parseFloat(a.review_count);
      });
      
      let hotelCoordinates = [
        ordered[0].coordinates.latitude,
        ordered[0].coordinates.longitude
      ];
      let randomHotel=ordered[Math.floor(Math.random()*(ordered.length))];
      // console.log(ordered[0]);
      const searchMonuments = {
        sort: "rating",
        categories: "landmarks",
        latitude: hotelCoordinates[0],
        longitude: hotelCoordinates[1],
        radius: 10000
      };
      client
        .search(searchMonuments)
        .then(data => {
          const secondResult = data.jsonBody.businesses.slice(0, 30);
          let orderedMon = secondResult.sort(function(a, b) {
            return parseFloat(b.review_count) - parseFloat(a.review_count);
          });
          let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8];
          let c = 0;
          for (let i = 0; i < itinerary.length; i += 1) {
            if (days < 4) {
              itinerary[i].monuments.push(orderedMon[c]);
              itinerary[i].monuments.push(orderedMon[c + 1]);
              c += 2;
            } else {
              itinerary[i].monuments.push(orderedMon[c]);
              c += 1;
            }
          }
          //console.log(itinerary[0].monuments,itinerary[1].monuments, itinerary[2].monuments,);
          //console.log(secondResult)
          const searchMuseums = {
            sort: "rating",
            categories: "museums",
            latitude: hotelCoordinates[0],
            longitude: hotelCoordinates[1],
            radius: 10000,
          };
          client
            .search(searchMuseums)
            .then(data => {
              const thirdResult = data.jsonBody.businesses;
              let orderedMus = thirdResult.sort(function(a, b) {
                return parseFloat(b.review_count) - parseFloat(a.review_count);
              });
              let d = 0;
              for (let i = 0; i < itinerary.length; i += 1) {
                if (days < 4) {
                  itinerary[i].museums.push(orderedMus[d]);
                  itinerary[i].museums.push(orderedMus[d + 1]);
                  d += 2;
                } else {
                  itinerary[i].museums.push(orderedMus[d]);
                  d += 1;
                }
              }
              //  console.log(thirdResult)
              const searchRestaurants = {
                sort: "rating",
                categories: "restaurants",
                latitude: hotelCoordinates[0],
                longitude: hotelCoordinates[1],
                radius: 4000
              };
              client
                .search(searchRestaurants)
                .then(data => {
                  const fourthResult = data.jsonBody.businesses;
                  let orderedRes = fourthResult.sort(function(a, b) {
                    return (
                      parseFloat(b.review_count) - parseFloat(a.review_count)
                    );
                  });
                  let e = 0;
                  for (let i = 0; i < itinerary.length; i += 1) {
                    if (days < 4) {
                      itinerary[i].restaurants.push(orderedRes[e]);
                      itinerary[i].restaurants.push(orderedRes[e + 1]);
                      itinerary[i].restaurants.push(orderedRes[e + 2]);
                      e += 3;
                    } else {
                      itinerary[i].restaurants.push(orderedRes[e]);
                      itinerary[i].restaurants.push(orderedRes[e + 1]);
                      e += 2;
                    }
                  }
                  //  console.log(itinerary[0].restaurants[0]);
                  axios
                    .get(
                      `https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts%7C%7Cpageimages&exintro&explaintext&redirects=1&titles=${city}`
                    )
                    .then(response => {
                      let busq = response.data.query.pages;
                      let place = Object.keys(busq)[0];
                      let extracto=busq[place].extract;
                      console.log(extracto)
                      //console.log(place);
                      //console.log("hey: ", extracts);

                      
                      User.findById(req.user._id)
                      .then(dbUser=> {
                        console.log(dbUser);
          
                        if(dbUser.itinerary){
                          Itinerary.updateOne({_id:dbUser.itinerary},{
                        city: city,
                        hotel: randomHotel,
                        plan: itinerary,
                        extract:extracto,
                            }).then(()=>{
                              res.redirect("/user-results")
                            })
                        }
                        else {
                        Itinerary.create({  
                        city: city,
                        hotel: randomHotel,
                        plan: itinerary,
                        extract:extracto,
                          })
                          .then(newItinerary=>{
                            //update users itinerary-id
                            return User.findByIdAndUpdate(req.user._id,{itinerary:newItinerary})                            
                          })
                          .then((user) => {
                            res.redirect("/user-results")
                          })
                          .catch(err=>{console.log(err)});
                        }
                        // if user as itenary 
                      //   update itinary
                      // else 
                      //   add itinary
                      })
                      


                      // res.render("result.hbs", {
                      //   city: city,
                      //   ordered: randomHotel,
                      //   itinerary: itinerary,
                      //   extracts:extracts,
                      // });
                      // return;
                    });
                  
                  //  console.log(fourthResult)
                })
                .catch(err => {
                  console.log(err);
                });
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          console.log(err);
        });
      // const prettyJson = JSON.stringify(ordered[0], null, 4);
      // console.log("Empieza aqui",prettyJson);
      // console.log("acaba aqui");
    })
    .catch(e => {
      console.log(e);
    });
  
});
module.exports = router;
