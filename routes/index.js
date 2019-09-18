const express = require("express");
const router = express.Router();
var Amadeus = require("amadeus");
const axios = require("axios");
var amadeus = new Amadeus({
  clientId: "zOEKFP0AAfN78XN6tbqMDZE2DA3VbuoT",
  clientSecret: "ymwDkjLZzeXuRLeA"
});




/* GET home page */
router.get('/', (req, res, next) => {
  res.render("auth/home")
});

module.exports = router;
