pconst User = require("../models/User");

const getUser = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email });

    if (user) {
      const { password, likedMovies, accessToken, userData } = user._doc;
      return res.status(201).json({ user: userData });
    }

    return res.status(401).json({ message: "User not found!" });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const updateUser = async (req, res) => {
  try {
    const email = req.params.email;
    const userData = req.body;

    if (email && userData) {
      const userUpdate = await User.findByIdAndUpdate(email, { userData }, { new: true });
      const { password, likedMovies, accessToken, userData } = userUpdate._doc;

      return res.status(201).json({ user: userData });
    }

    return res.status(401).json({ message: "Email or user date is not valid!" });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = { getUser, updateUser };
