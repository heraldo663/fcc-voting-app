const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("./../helpers/auth");
const { postPolls, getPoll } = require("./../controllers/dashboardController");
const Polls = require("./../model/Polls");
/* GET home page. */
router.get("/", ensureAuthenticated, async (req, res, next) => {
  const allPolls = await Polls.find({});
  console.log(allPolls);
  res.render("index", { polls: allPolls });
});
router.get("/new", ensureAuthenticated, function(req, res, next) {
  res.render("dashboard/new", { title: "Dashboard" });
});
router.post("/create", ensureAuthenticated, postPolls);

module.exports = router;
