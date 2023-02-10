const mongoose = require("mongoose");

const questionSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  question: {type: String, required: true },
  answers: {correct: String, incorrect: [String]},
  answered: {type: String}
});

module.exports = mongoose.model("Question", questionSchema);
