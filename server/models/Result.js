const mongoose = require("mongoose");
// All passed topics tests will be here
const ResultSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  user_email: {
    type: String,
    required: true,
  },
  topic_id: {
    type: String,
    required: true,
  },
  topic_name: {
    type: String,
    required: true,
  },
  results: {
    type: Array,
    default: [],
  },
  amount_of_corrects: {
    type: Number,
    required: true,
  },
  amount_of_questions: {
    type: Number,
    required: true,
  },
  chapter_name: {
    type: String,
    required: true,
  },
  subject_name: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  content: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("Result", ResultSchema);
