const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const passport = require("passport");
const router = express.Router();

const {
  getLogin,
  getRegister,
  postLogin,
  postRegister,
  getLogout
} = require("./../controllers/userController");

// User Login Route
router.get("/login", getLogin);

// User Register Route
router.get("/register", getRegister);

// Login Form POST
router.post("/login", postLogin);

// Register Form POST
router.post("/register", postRegister);

// Logout User
router.get("/logout", getLogout);

module.exports = router;
