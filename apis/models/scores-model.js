const mongoose = require("mongoose");

const scoreSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  question:{type: String, required: true},
  score: {correct: Number},
});

module.exports = mongoose.model("Score", scoreSchema);
