const mongoose = require("mongoose");

const SubjectSchema = new mongoose.Schema({
  class_name: {
    type: String,
    required: true,
  },
  subject_name: {
    type: String,
    required: true,
  },
  image_url: {
    type: String,
    required: false,
  },
  hidden: {
    type: Boolean,
    default: false,
  },
  created_at: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("Subject", SubjectSchema);
