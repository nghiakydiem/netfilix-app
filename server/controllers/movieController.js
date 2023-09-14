const User = require("../models/User");

const getLikedMovies = async (req, res) => {
  try {
    const email = req.params.email;
    const user = await User.findOne({ email });

    if (user) {
      return res.status(201).json({ linkedMovies: user.likedMovies });
    }

    return res.status(401).json({ message: "User not found!" });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const getLikedMovie = async (req, res) => {
  try {
    const movieId = req.params.id;
    const email = req.params.email;
    const user = await User.findOne({ email });

    if (user) {
      const { likedMovies } = user;
      const movie = await likedMovies.findIndex(({ id }) => id === Number(movieId));

      if (movie !== -1) {
        return res.status(201).json({ movie: true });
      } else {
        return res.status(401).json({ message: "Movie not found!" });
      }
    }

    return res.status(401).json({ message: "User not found!" });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const addLikedMovie = async (req, res) => {
  try {
    const movieId = req.params.id;
    const email = req.params.email;
    const newMovie = req.body;
    const user = await User.findOne({ email });

    if (user) {
      const { likedMovies } = user;
      const movieIndex = await likedMovies.find(({ id }) => id === Number(movieId));
      if (!movieIndex) {
        await User.findOneAndUpdate(
          user._id,
          {
            likedMovies: [...likedMovies, newMovie],
          },
          { new: true },
        );

        return res.status(201).json({ message: "Added movie success" });
      } else {
        return res.status(401).json({ message: "Movie added in liked movie list!" });
      }
    }

    return res.status(401).json({ message: "User not found!" });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

const deleteLikedMovie = async (req, res) => {
  try {
    const movieId = req.params.id;
    const email = req.params.email;
    const user = await User.findOne({ email });

    if (user) {
      const { likedMovies } = user;
      const movieIndex = await likedMovies.findIndex(({ id }) => id === Number(movieId));

      if (!movieIndex) {
        return res.status(401).json({ message: "Movie not found!" });
      }

      likedMovies.splice(movieIndex, 1);

      await User.findByIdAndUpdate(user._id, { likedMovies });

      return res.status(201).json({ message: "Deleted movie success" });
    }

    return res.status(401).json({ message: "User not found!" });
  } catch (error) {
    return res.status(400).json(error.message);
  }
};

module.exports = {
  getLikedMovies,
  getLikedMovie,
  addLikedMovie,
  deleteLikedMovie,
};
