const mongoose = require("mongoose");
const Movie = require("./Movie");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    require: true,
  },
  lastName: {
    type: String,
    require: true,
  },
  profileUrl: {
    type: String,
    default: "",
  },
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
    children: Movie,
    default: [],
  },
  accessToken: {
    type: String,
    default: "",
  },
  isAdmin: {
    type: Boolean,
    default: false,
  }
});

module.exports = mongoose.model("users", userSchema);
