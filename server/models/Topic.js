const mongoose = require("mongoose");

const TopicSchema = new mongoose.Schema({
  class_name: {
    type: String,
    required: true,
  },
  subject_name: {
    type: String,
    required: true,
  },
  chapter_name: {
    type: String,
    required: true,
  },
  topic_name: {
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
  content: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("Topic", TopicSchema);
