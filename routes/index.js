const express = require("express");
const router = express.Router();
const Polls = require("./../model/Polls");
const { getAllPolls } = require("./../controllers/dashboardController");

/* GET home page. */
router.get("/", getAllPolls);

module.exports = router;
