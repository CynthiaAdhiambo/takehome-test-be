const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  question: { type: String, required: true },
  choices: { type: Array, value: String, is_correct: Boolean, required: false },
  correct_answer: { type: String, required: true },
});

module.exports = mongoose.model("Question", questionSchema);
