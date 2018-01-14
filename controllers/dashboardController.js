const Polls = require("./../model/Polls");

module.exports = {
  getAllPolls: async (req, res) => {
    const allPolls = await Polls.find({});
    res.render("index", { polls: allPolls, user: req.user });
  },
  getPoll: async (req, res) => {
    const poll = await Polls.findById(req.params._id);
    res.render("dashboard/poll", { poll, user: req.user || null });
  },
  getNewPoll: async (req, res) => {
    res.render("dashboard/new", { user: req.user });
  },
  getMyPolls: async (req, res) => {
    const myPolls = await Polls.find({ user: req.user._id });
    console.log(myPolls);
    res.render("index", { polls: myPolls, user: req.user });
  },
  postPolls: async (req, res) => {
    const newPoll = new Polls({
      ...req.body,
      user: req.user._id
    });

    await newPoll.save();
    res.redirect("/");
  }
};
