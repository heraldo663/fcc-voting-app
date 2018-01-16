const express = require("express");
const path = require("path");
const logger = require("morgan");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const passport = require("passport");
const flash = require("connect-flash");
const session = require("express-session");
const exphbs = require("express-handlebars");
const methodOverride = require("method-override");
const { getArrayofItem, getArrayofVotes } = require("./helpers/data");

const index = require("./routes/index");
const users = require("./routes/users");
const dashboard = require("./routes/dashboard");

//env
require("dotenv").config();

//connection
require("./config/connection");

//passport
require("./services/passport")(passport);

const app = express();

// Handlebars Middleware
app.engine(
  "handlebars",
  exphbs({
    helpers: {
      getArrayofItem,
      getArrayofVotes
    },
    defaultLayout: "layout"
  })
);
app.set("view engine", "handlebars");
// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(methodOverride("_method"));

app.use(logger("dev"));
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// Static folder
app.use(express.static(path.join(__dirname, "public")));

// Express session midleware
app.use(
  session({
    secret: "secret",
    resave: true,
    saveUninitialized: true
  })
);

app.use(cookieParser());

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use("/", index);
app.use("/users", users);
app.use("/dashboard", dashboard);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  const err = new Error("Not Found");
  err.status = 404;
  next(err);
});

app.use(function(req, res, next) {
  res.locals.success_msg = req.flash("success_msg");
  res.locals.error_msg = req.flash("error_msg");
  res.locals.err = req.flash("err");
  res.locals.user = req.user || null;
  next();
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
