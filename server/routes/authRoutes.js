const express = require("express");
const { verifyToken } = require("../middleware/verifyToken");
const { register, login } = require("../controllers/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", verifyToken, login);

module.exports = router;
