const express = require("express");
const {
  getLikedMovies,
  addLikedMovie,
  deleteLikedMovie,
  getLikedMovie,
} = require("../controllers/movieController");

const router = express.Router();

router.get("/liked-list/:email", getLikedMovies);
router.get("/liked/:id/:email", getLikedMovie);
router.post("/liked/:id/:email", addLikedMovie);
router.delete("/liked/:id/:email", deleteLikedMovie);

module.exports = router;
