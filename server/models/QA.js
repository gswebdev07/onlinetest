const mongoose = require("mongoose");

const QASchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  user_email: {
    type: String,
    required: true,
  },
  question: {
    type: String,
    required: true,
  },
  answer: {
    type: String,
    required: false,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Q&A", QASchema);
