const User = require("../models/useModel");
const bcrypt = require("bcryptjs");

const signup = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.json({ message: "User already exists", status: 400 });
    }

    const salt = bcrypt.genSaltSync(10);
    const hashPassword = await bcrypt.hashSync(password, salt);
    if (hashPassword) {
      await User.create({ email, password: hashPassword });
    }

    return res.json({ message: "User created successfully", status: 200 });
  } catch (error) {
    return res.json({ message: "Signup failure...", status: 400 });
  }
};

const loginWithCookie = async (req, res) => {
  const rememberMeCookie = req.cookies.remember_me;
  const user = await User.findOne({ rememberMe: rememberMeCookie });

  if (user) {
    return res.json({
      status: 200,
      message: "Login with cookie successfully",
      user: user.email,
    });
  } else {
    return res.json({
      status: 401,
      message: "Login with cookie failed",
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password, rememberMe } = req.body;

    const user = await User.findOne({ email });
    const match = await bcrypt.compare(password, user.password);

    if (match) {
      if (rememberMe) {
        const salt = await bcrypt.genSalt(10);
        const token = await bcrypt.hash(user._id.toString(), salt);

        res.cookie("remember_me", token, {
          domain: process.env.URL_ORIGIN_KEY,
          path: "/",
          httpOnly: true,
          secure: true,
          maxAge: 30 * 24 * 60 * 60 * 1000,
        });

        await User.findByIdAndUpdate(user._id, {
          rememberMe: token,
        });
      }

      return res.json({
        message: "Login successfully",
        status: 200,
      });
    } else {
      return res.json({ message: "Password not match", status: 401 });
    }
  } catch (error) {
    return res.json({ message: "Signup failure...", status: 400 });
  }
};

const logout = async (req, res) => {
  try {
    await res.clearCookie("remember_me", "", {
      domain: process.env.URL_ORIGIN_KEY,
      path: "/",
      httpOnly: true,
      secure: true,
    });
    return res.json({ message: "Delete cookie successfully...", status: 200 });
  } catch (error) {
    return res.json({ message: "Delete cookie failure...", status: 400 });
  }
};

const getLikedMovies = async (req, res) => {
  try {
    // Check user in mongodb
    const email = req.params.email;
    const user = await User.findOne({ email });

    if (user) {
      return res.json({
        status: 200,
        message: "success",
        linkedMovies: user.likedMovies,
      });
    } else {
      return res.json({ status: 401, message: "User not found!" });
    }
  } catch (error) {
    return res.json({ status: 400, message: "Get liked movies failure!" });
  }
};

const getLikedMovie = async (req, res) => {
  try {
    // CHECK USER IN MONGODB
    const email = req.params.email;
    const movieId = req.params.id;
    const user = await User.findOne({ email });

    if (user) {
      const { likedMovies } = user;
      const movie = await likedMovies.findIndex(
        ({ id }) => id === Number(movieId),
      );

      if (movie !== -1) {
        return res.json({
          status: 200,
          message: "Movie found...",
          movie: true,
        });
      } else {
        return res.json({ status: 401, message: "Movie not found!!!" });
      }
    } else {
      return res.json({ message: "User not found!!!" });
    }
  } catch (error) {
    return res.json({ message: "Get liked movie failure..." });
  }
};

const addToLikedMovies = async (req, res) => {
  try {
    // CHECK USER IN MONGODB
    const { email, data } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      // CHECK MOVIES LIKED IN MONGODB
      const likedMovies = user.likedMovies;
      const movieAlreadyLiked = await likedMovies.find(
        ({ id }) => id === Number(data.id),
      );
      if (!movieAlreadyLiked) {
        await User.findOneAndUpdate(
          user._id,
          {
            likedMovies: [...user.likedMovies, data],
          },
          { new: true },
        );
        return res.json({ message: "Added success..", status: 200 });
      } else {
        return res.json({
          message: "Movie added in liked movies list...",
          status: 400,
        });
      }
    } else {
      return res.json({ message: "Added success..." });
    }
  } catch (error) {
    return res.json({ message: "User not found...", status: 404 });
  }
};

const deleteLikedMovie = async (req, res) => {
  try {
    // Check user in mongodb
    const email = req.params.email;
    const movieId = req.params.id;
    const user = await User.findOne({ email });

    if (user) {
      // Check movies liked in mongodb
      const { likedMovies } = user;
      const movieIndex = await likedMovies.findIndex(
        ({ id }) => id === Number(movieId),
      );

      if (movieIndex === -1)
        return res.json({ status: 401, message: "Movie not found..." });

      likedMovies.splice(movieIndex, 1);

      await User.findByIdAndUpdate(user._id, { likedMovies });

      return res.json({ status: 200, message: "Deleted success..." });
    }

    return res.json({ message: "User not found..." });
  } catch (error) {
    return res.json({ message: "Delete liked movie failure..." });
  }
};

module.exports = {
  addToLikedMovies,
  getLikedMovies,
  getLikedMovie,
  deleteLikedMovie,
  signup,
  login,
  loginWithCookie,
  logout,
};
