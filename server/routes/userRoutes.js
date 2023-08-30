const express = require("express");
const {
  addToLikedMovies,
  getLikedMovies,
  deleteLikedMovie,
  getLikedMovie,
  signup,
  login,
  loginWithCookie,
  logout
} = require("../controllers/userController");

const router = express.Router();

router.get("/:email/mylist", getLikedMovies);
router.get("/:email/:id", getLikedMovie);
router.get("/login", loginWithCookie);
router.get("/logout", logout);
router.post("/register", signup);
router.post("/login", login);
router.post("/add-liked", addToLikedMovies);
router.delete("/:email/:id", deleteLikedMovie);

module.exports = router;
