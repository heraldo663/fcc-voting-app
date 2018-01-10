const User = require("./../model/User");
const bcrypt = require("bcryptjs");
const passport = require("passport");

module.exports = {
  getLogin: (req, res) => {
    res.render("users/login");
  },
  getRegister: (req, res) => {
    res.render("users/register");
  },
  postLogin: (req, res, next) => {
    passport.authenticate("local", {
      successRedirect: "/",
      failureRedirect: "/users/login",
      failureFlash: true
    })(req, res, next);
  },
  postRegister: (req, res) => {
    let err = [];

    if (req.body.password != req.body.password2) {
      err.push({ text: "Passwords do not match" });
    }

    if (req.body.password.length < 4) {
      err.push({ text: "Password must be at least 4 characters" });
    }

    if (err.length > 0) {
      res.render("users/register", {
        err: err,
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        password2: req.body.password2
      });
    } else {
      User.findOne({ email: req.body.email }).then(user => {
        if (user) {
          req.flash("error_msg", "Email already regsitered");
          res.redirect("/users/register");
        } else {
          const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
          });

          bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
              if (err) throw err;
              newUser.password = hash;
              newUser
                .save()
                .then(user => {
                  req.flash(
                    "success_msg",
                    "You are now registered and can log in"
                  );
                  res.redirect("/users/login");
                })
                .catch(err => {
                  console.log(err);
                  return;
                });
            });
          });
        }
      });
    }
  },
  getLogout: (req, res) => {
    req.logout();
    req.flash("success_msg", "You are logged out");
    res.redirect("/users/login");
  }
};
