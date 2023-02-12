const mongoose = require("mongoose");

const scoreSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  question:{type: mongoose.Schema.Types.ObjectId, ref:'Question', required: true},
  answer: {type: String},
  is_correct: {type: Boolean},
  score: {type: Number},
  // total_correct: {type: Number}
});

module.exports = mongoose.model("Score", scoreSchema);
