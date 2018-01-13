const express = require("express");
const router = express.Router();
const Polls = require("./../model/Polls");

/* GET home page. */
router.get("/", async (req, res, next) => {
  const allPolls = await Polls.find({});
  console.log(allPolls);
  res.render("index", { polls: allPolls });
});

module.exports = router;
