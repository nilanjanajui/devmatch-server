const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { getUserProfile, updateProfile } = require("../controllers/userController");

router.get("/:id", getUserProfile);
router.patch("/profile", protect, updateProfile);

module.exports = router;