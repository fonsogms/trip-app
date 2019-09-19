const express = require("express");
const router = express.Router();
const Amadeus = require("amadeus");
const axios = require("axios");

router.get("/", (req, res, next) => {
  axios.get(
    "https://api.yelp.com/v3/businesses/search?term=delis&latitude=37.786882&longitude=-122.399972"
  );
  res.render("search");
});

router.get("/", (req, res, next) => {
  const searchQuery = "berlin";
  axios
    .get(
      `https://en.wikipedia.org/w/api.php?action=query&titles=${searchQuery}&prop=extracts|pageimages|info&pithumbsize=400&inprop=url&redirects=&format=json&origin=*`
    )
    .then(response => {
      console.log(response.query);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
