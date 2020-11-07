const mongoose = require("mongoose");

const General_Schema = new mongoose.Schema({
  about: {
    type: String,
    required: false,
  },
  disclaimer: {
    type: String,
    required: false,
  },
  terms: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model("General", General_Schema);
