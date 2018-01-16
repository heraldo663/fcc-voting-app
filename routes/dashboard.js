const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("./../helpers/auth");
const {
  postPolls,
  patchVote,
  getAllPolls,
  getPoll,
  getNewPoll,
  getMyPolls,
  deletePoll
} = require("./../controllers/dashboardController");
const Polls = require("./../model/Polls");

router.get("/", ensureAuthenticated, getAllPolls);

router.get("/new", ensureAuthenticated, getNewPoll);

router.get("/mypolls", ensureAuthenticated, getMyPolls);

router.patch("/:id/vote", patchVote);

router.get("/:id", getPoll);

router.post("/create", ensureAuthenticated, postPolls);

router.delete("/delete/:id", ensureAuthenticated, deletePoll);

module.exports = router;
