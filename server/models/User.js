const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  mobile_number: {
    type: Number,
    requried: true,
  },
  class: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    default: "Karnataka",
  },
  city: {
    type: String,
    default: "Bengaluru",
  },
  gender: {
    type: String,
    required: false,
  },
  age: {
    type: Number,
    required: false,
  },
  bookmarks: {
    type: Array,
    default: [],
  },
});

module.exports = mongoose.model("User", UserSchema);
