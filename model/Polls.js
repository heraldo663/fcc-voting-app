const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PollSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  itens: [
    {
      item: {
        type: String
      },
      votes: {
        type: Number,
        default: 0
      },
      usersWhoVotes: [
        {
          type: String
        }
      ]
    }
  ],
  date: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  }
});

const Polls = mongoose.model("polls", PollSchema);

module.exports = Polls;
