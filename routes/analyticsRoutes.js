const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { getAnalyticsOverview } = require("../controllers/analyticsController");

router.get("/overview", protect, getAnalyticsOverview);

module.exports = router;