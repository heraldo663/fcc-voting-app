const Polls = require("./../model/Polls");

module.exports = {
  getAllPolls: async (req, res) => {
    const allPolls = await Polls.find({});
    res.render("index", { polls: allPolls, user: req.user });
  },
  getPoll: async (req, res) => {
    const poll = await Polls.findById(req.params.id);
    res.render("dashboard/poll", { poll, user: req.user || null });
  },
  getNewPoll: async (req, res) => {
    res.render("dashboard/new", { user: req.user });
  },
  getMyPolls: async (req, res) => {
    const myPolls = await Polls.find({ user: req.user._id });
    res.render("dashboard/mypolls", { polls: myPolls, user: req.user });
  },
  postPolls: async (req, res) => {
    const itens = req.body.itens.map(item => {
      return {
        item
      };
    });

    const newPoll = new Polls({
      title: req.body.title,
      itens,
      user: req.user._id
    });

    const poll = await newPoll.save();
    res.render("dashboard/create", poll);
  },
  patchVote: async (req, res) => {
    let keysValues = Object.keys(req.body);
    let vote = "";
    keysValues.map((content, index, array) => {
      if (content == "votes") {
        vote = array[index - 1];
      }
    });
    const poll = await Polls.findById(req.params.id);
    const item = poll.itens.find(x => x.item == vote);
    item.votes += 1;
    const newPoll = await poll.save();
    console.log(newPoll);
    res.redirect("/");
  },
  deletePoll: async (req, res) => {
    try {
      const poll = await Polls.findByIdAndRemove(req.params.id);
      res.send({ success_msg: "Poll Deleted" });
    } catch (error) {
      res.send({ error_msg: "Fail to delete" });
    }
  }
};
