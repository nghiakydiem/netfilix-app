const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  likedMovies: {
    type: Array,
    default: [],
  },
  rememberMe: {
    type: String,
    default: "",
  },
});

module.exports = mongoose.model("users", userSchema);
