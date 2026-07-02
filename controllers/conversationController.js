const mongoose = require("mongoose");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const User = require("../models/User");
const Project = require("../models/Project");

// GET /api/conversations — my conversations, newest activity first
const getMyConversations = async (req, res) => {
    try {
        const userId = req.user.id;

        const conversations = await Conversation.find({ participants: userId })
            .populate("participants", "name image title")
            .sort({ updatedAt: -1 });

        const withMeta = await Promise.all(
            conversations.map(async (conv) => {
                const other = conv.participants.find(
                    (p) => p._id.toString() !== userId
                );

                const unreadCount = await Message.countDocuments({
                    conversationId: conv._id,
                    senderId: { $ne: userId },
                    readBy: { $ne: userId },
                });

                return {
                    id: conv._id,
                    otherUser: other
                        ? { id: other._id, name: other.name, image: other.image, title: other.title }
                        : { id: null, name: "Unknown", image: "", title: "" },
                    projectId: conv.projectId,
                    projectTitle: conv.projectTitle,
                    lastMessage: conv.lastMessage,
                    unreadCount,
                    updatedAt: conv.updatedAt,
                };
            })
        );

        res.json(withMeta);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST /api/conversations — get-or-create a conversation with another user
const startConversation = async (req, res) => {
    try {
        const userId = req.user.id;
        const { recipientId, projectId } = req.body;

        if (!recipientId) {
            return res.status(400).json({ message: "recipientId is required" });
        }
        if (recipientId === userId) {
            return res.status(400).json({ message: "You can't message yourself" });
        }
        if (!mongoose.Types.ObjectId.isValid(recipientId)) {
            return res.status(400).json({ message: "Invalid recipientId" });
        }

        const recipient = await User.findById(recipientId).select("name image title");
        if (!recipient) {
            return res.status(404).json({ message: "Recipient not found" });
        }

        let projectTitle = "";
        let cleanProjectId = null;
        if (projectId) {
            if (!mongoose.Types.ObjectId.isValid(projectId)) {
                return res.status(400).json({ message: "Invalid projectId" });
            }
            const project = await Project.findById(projectId).select("title");
            if (project) {
                projectTitle = project.title;
                cleanProjectId = project._id;
            }
        }

        let conversation = await Conversation.findOne({
            participants: { $all: [userId, recipientId], $size: 2 },
            projectId: cleanProjectId,
        });

        if (!conversation) {
            conversation = await Conversation.create({
                participants: [userId, recipientId],
                projectId: cleanProjectId,
                projectTitle,
            });
        }

        res.status(201).json({
            id: conversation._id,
            otherUser: { id: recipient._id, name: recipient.name, image: recipient.image, title: recipient.title },
            projectId: conversation.projectId,
            projectTitle: conversation.projectTitle,
            lastMessage: conversation.lastMessage,
            unreadCount: 0,
            updatedAt: conversation.updatedAt,
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// GET /api/conversations/:id/messages — thread, marks incoming messages as read
const getMessages = async (req, res) => {
    try {
        const userId = req.user.id;
        const conversation = await Conversation.findById(req.params.id);

        if (!conversation) return res.status(404).json({ message: "Conversation not found" });
        if (!conversation.participants.some((p) => p.toString() === userId)) {
            return res.status(403).json({ message: "Not authorized" });
        }

        const messages = await Message.find({ conversationId: conversation._id }).sort({
            createdAt: 1,
        });

        await Message.updateMany(
            { conversationId: conversation._id, senderId: { $ne: userId }, readBy: { $ne: userId } },
            { $addToSet: { readBy: userId } }
        );

        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// POST /api/conversations/:id/messages — send a message
const sendMessage = async (req, res) => {
    try {
        const userId = req.user.id;
        const { text } = req.body;

        if (!text?.trim()) {
            return res.status(400).json({ message: "Message text is required" });
        }

        const conversation = await Conversation.findById(req.params.id);
        if (!conversation) return res.status(404).json({ message: "Conversation not found" });
        if (!conversation.participants.some((p) => p.toString() === userId)) {
            return res.status(403).json({ message: "Not authorized" });
        }

        const message = await Message.create({
            conversationId: conversation._id,
            senderId: userId,
            text: text.trim(),
            readBy: [userId],
        });

        conversation.lastMessage = { text: message.text, senderId: userId, createdAt: message.createdAt };
        await conversation.save();

        res.status(201).json(message);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getMyConversations, startConversation, getMessages, sendMessage };