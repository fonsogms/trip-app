const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("02-search.hbs");
});

module.exports = router;
