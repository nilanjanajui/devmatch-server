const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema(
    {
        participants: [
            { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        ],
        projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", default: null },
        projectTitle: { type: String, default: "" },
        lastMessage: {
            text: { type: String, default: "" },
            senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
            createdAt: { type: Date },
        },
    },
    { timestamps: true }
);

conversationSchema.index({ participants: 1 });

module.exports = mongoose.model("Conversation", conversationSchema);