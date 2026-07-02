const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
    getMyConversations,
    startConversation,
    getMessages,
    sendMessage,
} = require("../controllers/conversationController");

router.get("/", protect, getMyConversations);
router.post("/", protect, startConversation);
router.get("/:id/messages", protect, getMessages);
router.post("/:id/messages", protect, sendMessage);

module.exports = router;