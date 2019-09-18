const express = require("express");
const router = express.Router();
const Amadeus = require('amadeus');
const axios=require("axios");
const API_KEY = '0_nV6ChR3EFhFwwsfs_9JqsBFCkYvf0U17qJXbIazY6sMAy26HK39FklbaJkHhrAsZ_E20BAz3mVY9-6c4vPih5NefgJTUDhynU4wADCt6rphCxm8NTCpA-FoAaBXXYx';
var amadeus = new Amadeus({
  clientId: 'zOEKFP0AAfN78XN6tbqMDZE2DA3VbuoT',
  clientSecret: 'ymwDkjLZzeXuRLeA'
});
router.get('/', (req, res, next) => {
  axios.get("https://api.yelp.com/v3/businesses/search?term=delis&latitude=37.786882&longitude=-122.399972")
  res.render("search")
});


module.exports = router;
