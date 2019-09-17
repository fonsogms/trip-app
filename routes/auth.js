const express = require("express");
const bcrypt = require("bcrypt");

const router = express.Router();
const User = require("../models/User");

//LOGIN
router.get("/signup", (req, res) => {
  res.render("auth/home", { errorMessage: req.flash("error") });
});

router.get("/login", (req, res) => {
  res.render("auth/home", { errorMessage: req.flash("error") });
});

const passport = require("passport");

router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/search",
    failureRedirect: "/",
    failureFlash: true
  })
);

//SOCIAL LOGIN
router.get("/facebook", passport.authenticate("facebook"));

router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: "/search",
    failureRedirect: "/auth/login"
  })
);
////

router.post("/signup", (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;

  // check if the password is long enough and username is not empty
  if (password.length < 8) {
    res.render("auth/home", {
      message: "Your password must be 8 char. min."
    });
    return;
  }
  if (username === "") {
    res.render("auth/home", { message: "Your username cannot be empty" });
    return;
  }

  User.findOne({ username: username }).then(found => {
    if (found !== null) {
      res.render("auth/home", { message: "This username is already taken" });
    } else {
      // we can create a user with the username and password pair
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(password, salt);

      User.create({ username: username, password: hash })
        .then(dbUser => {
          //   passport.authenticate("local", { successRedirect: "/" })(
          //     req,
          //     res,
          //     next
          //   );
          req.login(dbUser, err => {
            if (err) next(err);
            else res.redirect("/");
          });
        })
        .catch(err => {
          next(err);
        });
    }
  });
});

const loginCheck = () => {
  return (req, res, next) => {
    if (req.isAuthenticated()) {
      // if user is logged in, proceed to the next function
      next();
    } else {
      // else if user is not logged in, redirect to /login
      res.redirect("/search");
    }
  };
};
router.get("/search", loginCheck(), (req, res) => {
  res.render("02-search");
});

router.get("/logout", (req, res, next) => {
  // passport
  req.logout();
  res.redirect("auth/home");
});

module.exports = router;
