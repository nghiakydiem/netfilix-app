const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const register = async (req, res) => {
  try {
    const userBody = req.body;
    if (userBody.email && userBody.password) {
      const user = await User.findById(userBody.email);
      if (user) {
        return res.status(400).json({ message: "User already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(userBody.password, salt);

      if (hashPassword) {
        const newUser = await User.create({
          firstName: userBody.firstName,
          lastName: userBody.lastName,
          profileUrl: userBody.profileUrl,
          email: userBody.email,
          password: hashPassword,
        });

        if (rememberMe) {
          const accessToken = await jwt.sign(
            { id: newUser._id, email: newUser.email },
            process.env.JWT_SECRET_KEY,
            {
              expiresIn: "3d",
            },
          );

          const userUpdate = await User.findByIdAndUpdate(
            newUser._id,
            { accessToken },
            { new: true },
          );
          const { password, ...userData } = userUpdate._doc;

          return res.status(200).json({ message: "User created successfully", user: userData });
        }
        const { password, ...userData } = newUser._doc;

        return res.status(200).json({ message: "User created successfully", user: userData });
      }
    }

    return res.status(400).json({ message: "Email or password is not valid!" });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};



const login = async (req, res) => {
  try {
    const userToken = req.user;
    const { email, password, rememberMe } = req.body;

    if (userToken) {
      const user = await User.findById(userToken.id);
      console.log(Boolean(user));
      const { password, ...userData } = user._doc;
      if (user) {
        return res.status(200).json({ message: "Login successfully", user: userData });
      }
    }

    if (email && password) {
      const user = await User.findOne({ email });
      const match = await bcrypt.compare(password, user.password);

      if (match) {
        if (rememberMe) {
          console.log("user_id:", user._id);
          console.log("user.email:", user.email);
          const accessToken = await jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_SECRET_KEY,
            {
              expires: "3d",
            },
          );

          const userUpdate = await User.findByIdAndUpdate(user._id, { accessToken }, { new: true });
          const { password, ...userData } = userUpdate._doc;

          return res.status(200).json({ message: "Login successfully", user: userData });
        }

        const { password, ...userData } = user._doc;
        return res.json({ status: 200, message: "Login successfully", user: userData });
      } else {
        return res.status(400).json({ message: "Password not match" });
      }
    }

    return res.status(400).json({ message: "Email or password is not valid!" });
  } catch (error) {
    return res.status(400).json({ message: "Signup failure" });
  }
};

module.exports = { register, login };
