const Polls = require("./../model/Polls");

module.exports = {
  getPoll: async (req, res) => {
    const poll = await Polls.find({ users: req.user.id });
    res.render("dashboard/mypolls");
  },
  postPolls: async (req, res) => {
    console.log(req.body);
    const newPoll = new Polls({
      ...req.body
    });

    await newPoll.save();
    res.redirect("/");
  }
};
