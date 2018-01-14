const express = require("express");
const router = express.Router();
const { ensureAuthenticated } = require("./../helpers/auth");
const {
  postPolls,
  getAllPolls,
  getPoll,
  getNewPoll,
  getMyPolls
} = require("./../controllers/dashboardController");
const Polls = require("./../model/Polls");

router.get("/", ensureAuthenticated, getAllPolls);

router.get("/new", ensureAuthenticated, getNewPoll);

router.get("/mypolls", ensureAuthenticated, getMyPolls);

router.get("/:id", getPoll);

router.post("/create", ensureAuthenticated, postPolls);

module.exports = router;
