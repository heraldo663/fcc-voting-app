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
      type: String
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
