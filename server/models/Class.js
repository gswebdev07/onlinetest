const mongoose = require("mongoose");

const ClassSchema = new mongoose.Schema({
  class_name: {
    type: String,
    required: true,
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

module.exports = mongoose.model("Class", ClassSchema);
