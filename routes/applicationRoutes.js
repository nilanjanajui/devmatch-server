const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
    submitApplication,
    getMyApplications,
    getProjectApplicants,
    updateApplicationStatus,
} = require("../controllers/applicationController");

router.post("/", protect, submitApplication);
router.get("/", protect, getMyApplications);
router.get("/project/:id", protect, getProjectApplicants);
router.patch("/:id", protect, updateApplicationStatus);

module.exports = router;