const express = require("express");
const {
  getUser,
  getAllUser,
  addUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();

// router.get("/list", getAllUser);
router.get("/:email", getUser);
// router.post("/add", addUser);
router.put("/update/:email", updateUser);
// router.delete("/delete", deleteUser);

module.exports = router;
